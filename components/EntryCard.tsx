//  This component is used to display the content of the entry
import { prisma } from "@/utils/db"
import { useRouter } from "next/router"


const EntryCard = ({entry}: any) => {
    const date = new Date(entry.createdAt).toDateString()
    const analysis = entry.analysis
    const router = useRouter()

    const handleDelete = async () => {
        await prisma.journalEntry.delete({
            where: {
                id: entry.id,
            },
        })
        router.reload()
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6"><b>{date}</b></div>
            <div className="px-4 py-5 sm:px-6"><b>Summary:</b> {analysis.summary}</div>
            <div className="px-4 py-5 sm:px-6"><b>Mood:</b> {analysis.mood}</div>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
        )
}

export default EntryCard
