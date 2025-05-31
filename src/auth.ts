import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6';

type DuendeIDServerProfile = {
  username?: string;
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
};

const config: NextAuthConfig = {
  debug: true,
  session: {
    strategy: 'jwt',
  },
  providers: [
    DuendeIDS6Provider({
      id: 'id-server',
      clientId: 'nextApp',
      clientSecret: 'secret',
      issuer: process.env.ID_SERVER_ISSUER,
      authorization: {
        params: {
          scope: 'openid profile auctionApp',
          prompt: 'login',
        },
      },
      checks: ['pkce', 'state'],
      profile(profile: DuendeIDServerProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.username,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
    jwt({ token, profile, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile && 'username' in profile) {
        token.username = profile.username;
      }
      if (user && 'username' in user) {
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.username = token.username as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
