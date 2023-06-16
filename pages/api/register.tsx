import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import clientPromise from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Get the data from the form submission
    const { name, id, password, contact, userType } = req.body

    try {
      // Generate a salt and hash the password
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // Create a new user object with the hashed password
      const user = {
        name,
        id,
        password: hashedPassword,
        contact,
        userType,
      }

      // Connect to the database
      const client = await clientPromise
      const db = client.db()

      // Insert the user into the database
      await db.collection('users').insertOne(user)

      // Send a success response
      res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
      console.error(error)
      // Handle any errors
      res.status(500).json({ message: 'Server error' })
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
