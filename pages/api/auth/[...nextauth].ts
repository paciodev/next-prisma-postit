import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../prisma/client';

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
		}),
	],
};
export default NextAuth(authOptions);
