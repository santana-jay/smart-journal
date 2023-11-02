import { OpenAI } from 'langchain/llms/openai'
import z from 'zod'
import {StructuredOutputParser} from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import {Document} from 'langchain/document'
import {loadQARefineChain} from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        subject: z.string().describe('The subject of the journal entry'),
        mood: z.string().describe('The mood of the person who wrote the entry'),
        summary: z.string().describe('Quick summary of the entry'),
        negative: z.boolean().describe('Is the entry negative? (i.e. does it contain negative emotions?)'),
        color: z.string().describe('A hexadecimal color code that represents the mood of the entry. Example, #0101fe for blue representing happiness'),
    })
)

const getPrompt = async (content) => {
    const formatted_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
        'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {formatted_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: {formatted_instructions},
    })

    const input = await prompt.format({
        entry: content,
    })

    return input
}

export const analyze = async (content) => {
    const input = await getPrompt(content)
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
    const result = await model.call(input)

    try {
        return parser.parse(result)
    } catch (e) {
        console.error(e)
    }

}

const qa = async (question, entries) => {
    const docs = entries.map((entry) => {
        new Document({
            pageContent: entry.content,
            metadata: { id: entry.id, createAt: entry.createdAt },
        })
    })

    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'})
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question)

    const result = await chain.call({
        input_documents: relevantDocs,
        question,
    })

    return result.output_text
}
