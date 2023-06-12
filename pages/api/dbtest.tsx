import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    const client = await clientPromise
    res.status(200).json({ message: 'MongoDB database connection successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to MongoDB database' })
  }
}
