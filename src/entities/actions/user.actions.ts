'use server'

import { prisma } from '@/shared/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

// It is better do with Webhooks in production projects, it is beginner version of syncing user from clerk to database!!!!
export const syncUser = async () => {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!user || !userId) return

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (existingUser) return existingUser

    const newDbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
        image: user.imageUrl,
        name: `${user.firstName ?? ''} ${user.lastName ?? ''}`,
      },
    })

    return newDbUser
  } catch (e) {
    console.log('Error in syncUser', e)
  }
}

export const getUserByClerkId = async (clerkId: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    })
  } catch (e) {
    console.log('Error in getUserByClerkId', e)
  }
}

export const getDbUserId = async () => {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return null

    const user = await getUserByClerkId(clerkId)

    if (!user) throw new Error('User not found')

    return user.id
  } catch (e) {
    console.error('Error in getDbUserId', e)
  }
}
