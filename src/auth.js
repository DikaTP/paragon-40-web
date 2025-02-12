import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import { compare, hash } from 'bcryptjs';

import { getUserByEmail } from './utils/firebase/firestoreHelper';

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
        authorize: async (credentials) => {
          let user = null
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            // Check if user exists in Firestore
            const { email, password } = parsedCredentials.data;
            const user = await getUserByEmail(email);
            if (!user) return null;

            const passwordsMatch = await compare(password, user.password);
            if (passwordsMatch) return user;
          }
    
          return null;
        },
      }),
    ],
}
 
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);