import { auth } from "@clerk/nextjs"
import { prisma } from "./db"

export const getUserByClerkID = async () => {
    try{
        const {userId} = auth()
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId
        },
    })
    return user
} catch(e) {
    console.error('Unable to retrieve user', e)
}
}
