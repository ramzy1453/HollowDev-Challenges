import { NextAuthOptions, getServerSession } from "next-auth";
import Discord from "next-auth/providers/discord";

const authOptions: NextAuthOptions = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
