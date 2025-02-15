export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if(isLoggedIn && isOnLogin) return Response.redirect(new URL('/', nextUrl));

      if(!isLoggedIn) return false
      return true
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
}