// This route is used to create a new journal entry

import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day!',
        },
    })

    revalidatePath('/journal')

    const analysis = await analyze(entry.content)
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            ...analysis,
        },
    })

    return NextResponse.json({ data: entry })
}
