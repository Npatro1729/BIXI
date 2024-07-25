import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import user from '@/models/userModel';
import { connect } from '@/dbConfig/config';
import { NextApiRequest, NextApiResponse } from 'next';

// Extend the NextAuth session and token types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      admin: boolean;
      name: string;
    };
  }

  interface User {
    id: string;
    email: string;
    admin: boolean;
  }

  interface JWT {
    id: string;
    email: string;
    admin: boolean;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          await connect();
          const User = await user.findOne({ email });
          if (User && User.password === password) {
            return {
              id: User._id.toString(),
              email: User.email,
              admin: User.isAdmin,
              name: User.name,
            };
          }
          throw new Error('Invalid email or password');
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('Authorization error');
        }
      },
    }),
  ],
  pages: {
    signIn: '/Login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.admin = user.admin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.admin = token.admin as boolean;
      return session;
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_DOMAIN || '');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Authorization, Accept'
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    await NextAuth(req, res, authOptions);
  } catch (error) {
    console.error('Error in NextAuth API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
