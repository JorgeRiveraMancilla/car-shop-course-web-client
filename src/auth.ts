import NextAuth, { Profile } from "next-auth";
import { OIDCConfig } from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

type DuendeIDServerProfile = Omit<Profile, "username"> & {
  username?: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: process.env.ID_SERVER_ISSUER,
      authorization: {
        params: {
          scope: "openid profile auctionApp",
        },
      },
      checks: ["pkce", "state"],
    } as OIDCConfig<DuendeIDServerProfile>),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
