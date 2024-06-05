import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import user from '@/models/userModel';
import { connect } from '@/dbConfig/config';
import { NextApiRequest, NextApiResponse } from 'next';

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image?: string;
      };
    }
  
    interface User {
      id: string;
    }
  
    interface JWT {
      id: string;
    }
  }

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string };
        
        try {
          await connect();
          const User = await user.findOne({ email: email });
          if (User && User.password === password) {
            return { id: User._id.toString(), email: User.email };
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
  callbacks: {
     async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
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
