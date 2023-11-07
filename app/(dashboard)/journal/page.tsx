// this is the page that shows all the journal entries

import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import Question from "@/components/Question"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { useRouter } from "next/router"


const getEntries = async () => {
    const user = await getUserByClerkID()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            analysis: true,
        },
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    console.log('entries', entries)

    const router = useRouter()

    const handleDelete = async (id) => {
        await prisma.journalEntry.delete({
            where: {
                id: id,
            },
        })
        router.reload()
    }

    return (
        <div className="p-10 bg-zinc-400/10 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className='my-8'>
                <Question />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map(entry => (
                    <div key={entry.id}>
                        <Link href={`/journal/${entry.id}`}>
                            <EntryCard entry={entry} />
                        </Link>
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={() => handleDelete(entry.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JournalPage
