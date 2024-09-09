import NextAuth, { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

// Extend the built-in session types
interface ExtendedSession extends DefaultSession {
  accessToken?: string;
  user?: DefaultSession["user"] & {
    _id: string;
  };
}

// Extend the built-in user types
interface ExtendedUser extends DefaultUser {
  token?: string;
  _id: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          try {
            const res = await axios.post(`${process.env.BASE_URL}/admin/login`, {
              email: credentials.email,
              password: credentials.password
            })

            if (res.data) {
              
              return {
                ...res.data.doesUserEmailExist,
                token: res.data.token
              } as ExtendedUser
            } else {
              return null
            }
          } catch (e) {
            console.error('Auth error:', e)
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as ExtendedUser).token
        token._id = (user as ExtendedUser)._id
      }
      return token
    },
    async session({ session, token }): Promise<ExtendedSession> {
      
      
      return {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          _id: token._id as string
        }
      }

    }
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }