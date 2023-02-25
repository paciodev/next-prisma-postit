import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405).json({ message: 'This route accepts only GET requests.' });

	try {
		const data = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				author: true,
				comments: true
			}
		})
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ error: err })
	}
}