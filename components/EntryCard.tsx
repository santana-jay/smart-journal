//  This component is used to display the content of the entry

const EntryCard = ({entry}: any) => {
    const date = new Date(entry.createdAt).toDateString()
    const analysis = entry.analysis

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6"><b>{date}</b></div>
            <div className="px-4 py-5 sm:px-6"><b>Summary:</b> {analysis.summary}</div>
            <div className="px-4 py-5 sm:px-6"><b>Mood:</b> {analysis.mood}</div>
        </div>
        )
}

export default EntryCard
