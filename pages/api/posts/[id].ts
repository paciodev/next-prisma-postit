import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') return res.status(405).json({ message: 'This route accepts only GET requests.' });

	try {
		if (typeof req.query.id === 'string') {
			const data = await prisma.post.findUnique({
				where: {
					id: req.query.id
				},
				include: {
					author: {
						select: {
							id: true,
							image: true,
							name: true
						}
					},
					comments: {
						orderBy: {
							createdAt: 'desc'
						},
						include: {
							author: {
								select: {
									id: true,
									image: true,
									name: true
								}
							},
						}
					}
				}
			})
			res.status(200).json(data)
		} else {
			res.status(400).json({ error: 'Bad request' })
		}
	} catch (err) {
		res.status(500).json({ error: err })
	}
}