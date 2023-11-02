//  'use client' is a special comment that tells Vercel to only run this code on the client side.
// This is important because the code inside this component uses the browser's localStorage API to store the value of the editor.
// explain 'use client': https://vercel.com/docs/platform/limits#serverless-function-size-limit
'use client'

// This component is used to display the content of the entry

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
    const router = useRouter()

    const handleOnClick = async () => {
        const data = await createNewEntry()
        router.push(`/journal/${data.id}`)
    }

    return (
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
                <span className="text-3xl">New Entry</span>
            </div>
        </div>
    )
}

export default NewEntryCard
