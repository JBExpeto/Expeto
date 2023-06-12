import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function itemRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  interface User {
    id: string
    name?: string
    email?: string
    image?: string
  }
  const session = await getSession({ req })
  const user = session?.user as User

  if (!session || !session.user) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'GET') {
    // Connect to the database
    const client = await clientPromise
    const db = client.db()

    // Get the items registered by the current user
    const items = await db
      .collection('items')
      .find({ userId: user.id })
      .toArray()

    // Send a success response
    res.status(200).json(items)
  } else if (req.method === 'POST') {
    // Get the data from the form submission
    const data = {
      ...req.body,
      userId: user.id,
    }

    // Connect to the database
    const client = await clientPromise
    const db = client.db()

    // Insert the item into the database
    await db.collection('items').insertOne(data)

    // Send a success response
    res.status(200).json({ message: 'Item registered successfully' })
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
