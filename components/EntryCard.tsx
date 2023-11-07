import { deleteEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

//  This component is used to display the content of the entry

const EntryCard = ({entry}: any) => {
    const date = new Date(entry.createdAt).toDateString()
    const analysis = entry.analysis
    const router = useRouter()

    const handleDelete = async () => {
        await deleteEntry(entry.id);
        // Refresh the page
        router.refresh()
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6"><b>{date}</b>
                <button className="float-right" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <div className="px-4 py-5 sm:px-6"><b>Summary:</b> {analysis.summary}</div>
            <div className="px-4 py-5 sm:px-6"><b>Mood:</b> {analysis.mood}</div>
        </div>
        )
}

export default EntryCard
