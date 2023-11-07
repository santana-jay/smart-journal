//  This component is used to display the content of the entry

const EntryCard = ({entry}) => {
    const date = new Date(entry.createdAt).toDateString()

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">{date}</div>
            <div className="px-4 py-5 sm:px-6">{entry.summary}</div>
            <div className="px-4 py-5 sm:px-6">{entry.mood}</div>
        </div>
        )
}

export default EntryCard
