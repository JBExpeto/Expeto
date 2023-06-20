import { NextApiRequest, NextApiResponse } from 'next'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'
import clientPromise from './auth/lib/mongodb'

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, username, password, contact, userType } = req.body

  try {
    // Generate a salt
    const salt = genSaltSync(10)

    // Hash the password
    const hashedPassword = hashSync(password, salt)

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Store the user data in MongoDB
    await db.collection('users').insertOne({
      name,
      username,
      password: hashedPassword,
      contact,
      userType,
    })

    // Check password validation
    if (compareSync(password, hashedPassword)) {
      return res.status(200).json({ message: 'Registration successful' })
    } else {
      return res.status(400).json({ message: 'Invalid password' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Registration failed' })
  }
}
