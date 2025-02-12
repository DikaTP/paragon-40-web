export async function loginUser(credentials) {
    // In a real app, the credentials would be checked against a
    // database and potentially a session token set in a cookie
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          credentials.email === 'secret@test.com' &&
            credentials.password === '@Secret123'
        );
      }, 1000);
    });
  }