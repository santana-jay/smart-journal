'use client'
// This is the editor component that will be used to edit the content of the entry
import { updatedEntry, deleteEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content)
    const [isSaving, setIsSaving] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)
    const router = useRouter()
    const { mood, subject, summary, color, negative } = analysis
    const analysisData = [
        { name: 'Summary', value: summary },
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False' },
    ]

    const handleDelete = async () => {
        await deleteEntry(entry.id)
        router.push('/journal')
    }

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsSaving(true)
            const data = await updatedEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsSaving(false)
        },
    })

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                {isSaving ? (
                    <Spinner />
                ) : (
                    <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
                )}
                <textarea
                    className="w-full h-full p-8 text-xl outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{ backgroundColor: color }}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map((item) => (
                            <li
                                key={item.name}
                                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                            >
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                        <button
                            onClick={handleDelete}
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Delete
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor
