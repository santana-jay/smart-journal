// This route is used to update an existing journal entry

import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

//  Patch is used to update an existing resource
export const PATCH = async (request, {params}) => {
    const { content } = await request.json()
    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            },
        },
        // data is what is being updated
        data: {
            content,
        }
    })

    const analysis = await analyze(updatedEntry.content)

    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: analysis,
    })

    return NextResponse.json({ data: {...updatedEntry, analysis: updated} })
}
