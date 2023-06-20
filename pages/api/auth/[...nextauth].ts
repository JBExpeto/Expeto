import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import clientPromise from '../auth/lib/mongodb'
import { compare } from 'bcryptjs'

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
          // Find user by username
          const user = await collection.findOne({
            username: credentials.username,
          })

          if (user) {
            // Compare passwords
            const passwordMatch = await compare(
              credentials.password,
              user.password
            )

            if (user) {
              // Convert MongoDB document to user object
              const convertedUser = {
                id: user._id.toHexString(),
                name: user.username,

                // Add other user properties as needed
              }

              return convertedUser
            }
          }
        }

        return null
      },
    }),
  ],
}

export default NextAuth(authOptions)
