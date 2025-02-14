// app/providers/AuthProvider.js
'use client'; // Mark this as a Client Component

import { getDocument } from '@/utils/firebase/firestoreHelper';
import { SessionProvider } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext(null);
const UserProvider = ({children, session}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!session?.user || !session?.user?.id) {
      setUser(null)
    }
    else {
      getDocument('user', session.user.id).then(u => setUser(u))
    }
  }, [session?.user])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider> 
  )
}

export {UserContext}

export default function AuthProvider({ children, session }) {
  
  return (
    <SessionProvider session={session}>
      <UserProvider session={session}>
        {children}
      </UserProvider>
    </SessionProvider>
  );
}