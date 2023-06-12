import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function itemRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session || !session.user) {
    res.status(401).send('Unauthorized')
    return
  }

  if (req.method === 'POST') {
    // Get the data from the form submission
    const data = {
      ...req.body,
      userId: session.user.name,
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
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
