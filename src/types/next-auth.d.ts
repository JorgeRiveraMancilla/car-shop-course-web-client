import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      username?: string;
    } & DefaultSession['user'];
    accessToken?: string;
  }

  interface User extends DefaultUser {
    username?: string;
  }

  interface Profile {
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    username?: string;
    accessToken?: string;
  }
}
