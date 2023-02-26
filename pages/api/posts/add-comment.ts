import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).json({ message: 'This route accepts only POST requests.' });

	const session = await getServerSession(req, res, authOptions)
	if (!session) {
		return res.status(401).json({ message: 'Please sign in to make a post.' })
	}

	const { title, postId }: { title: string, postId: string } = req.body.data

	if (!title) {
		return res.status(400).json({ message: 'Please provide a text in body.' })
	}

	if (title.length > 300) {
		return res.status(400).json({ message: 'Please write a shorter post.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email || undefined }
	})

	try {
		const result = await prisma.comment.create({
			data: {
				message: title,
				authorId: user!.id,
				postId
			}
		})
		res.status(200).json(result)
	} catch (err) {
		res.status(500).json({ error: err })
	}
}