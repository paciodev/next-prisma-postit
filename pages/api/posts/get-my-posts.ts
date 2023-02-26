import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405).json({ message: 'This route accepts only GET requests.' });

	const session = await getServerSession(req, res, authOptions)
	if (!session?.user?.email) {
		return res.status(401).json({ message: 'Please sign in.' })
	}

	try {
		const data = await prisma.user.findUnique({
			where: {
				email: session.user?.email
			},
			include: {
				// TODO: change to posts
				Post: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						comments: true
					}
				}
			}
		})
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ error: err })
	}
}