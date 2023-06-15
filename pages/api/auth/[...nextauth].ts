import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Connect to MongoDB
        const client = await clientPromise
        const db = client.db('Expeto')
        const collection = db.collection('users')

        if (credentials) {
          // Find user by username and password
          const user = await collection.findOne({
            username: credentials.username,
            password: credentials.password,
          })

          if (user) {
            // Convert MongoDB document to user object
            const convertedUser = {
              id: user._id.toHexString(),
              name: user.name,
              email: user.email,
              // Add other user properties as needed
            }

            return convertedUser
          }
        }

        return null
      },
    }),
  ],
}

export default NextAuth(authOptions)
