'use client';

import { type Comment as CommentType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	id: string;
	avatar: string;
	name: string;
	postTitle: string;
	comments?: CommentType[];
};

const Post = ({ id, avatar, name, postTitle, comments }: Props) => {
	return (
		<div className='bg-white my-8 p-8 rounded-lg'>
			<div className='flex items-center gap-2'>
				<Image
					className='rounded-full'
					width={32}
					height={32}
					src={avatar}
					alt={`${name}'s avatar`}
				/>
				<h3 className='font-bold text-gray-700'>{name}</h3>
			</div>
			<div className='my-8'>
				<p className='break-all'>{postTitle}</p>
			</div>
			<div className='flex gap-8 cursor-pointer items-center'>
				{/* TODO: CHANGE TO SLUG */}
				<Link href={`/post/${id}`}>
					<p className='text-sm font-bold text-gray-700'>
						{comments?.length} Comments
					</p>
				</Link>
			</div>
		</div>
	);
};

export default Post;
