import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'DELETE') return res.status(405).json({ message: 'This route accepts only DELETE requests.' });

	const session = await getServerSession(req, res, authOptions)
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to delete your post.' })
	}

	try {
		const postId = req.body
		const result = await prisma.post.delete({
			where: {
				id: postId
			}
		})
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json({ error: err })
	}
}