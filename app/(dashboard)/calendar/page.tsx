import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
    const user = await getUserByClerkID()
    const analyses = await prisma.analysis.findMany({
        where: {

        }
    })
}

const Calendar = () => {
    return (
        <div>
            <h1>Calendar</h1>
        </div>
    )
}

export default Calendar
