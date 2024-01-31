import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
    const user = await currentUser()

    if (!user){
        return {
            redirect: {
                destination: '/journal',
                permanent: false,
            }
        }
    }

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })

    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress,
            },
        })
    }

    // redirect('/journal')
    return {
        redirect: {
            destination: '/journal',
            permanent: false,
        }
    }
}

const NewUser = async () => {
    await createNewUser()
    return <div>...loading</div>
}

export default NewUser;
