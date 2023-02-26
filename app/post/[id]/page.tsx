'use client';

import Post from '@/app/Post';
import { Post as PostType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import AddComment from './AddComment';
import TimeAgo from 'react-timeago';

type URL = {
	params: {
		id: string;
	};
};

const fetchDetails = async (id: string) => {
	const res = await axios.get(`/api/posts/${id}`);
	return res.data;
};

const PostPage = (url: URL) => {
	const { data, isLoading } = useQuery<PostType>({
		queryFn: () => fetchDetails(url.params.id),
		queryKey: ['detail-post'],
	});

	if (isLoading) return 'Loading...';

	return (
		<div>
			<Post
				id={data!.id}
				name={data!.author.name}
				avatar={data!.author.image}
				postTitle={data!.title}
				comments={data?.comments}
			/>
			<AddComment id={data!.id} />
			{data?.comments?.map((c) => (
				<div key={c.id} className='my-6 bg-white p-8 rounded-md'>
					<div className='flex items-center gap-2'>
						<Image
							width={24}
							height={24}
							src={c!.author!.image}
							alt={`${c!.author?.name}'s avatar`}
							className='rounded-full'
						/>
						<h3 className='font-bold'>{c.author?.name}</h3>
						<h2 className='text-sm'>
							<TimeAgo date={c.createdAt} />
						</h2>
					</div>
					<div className='py-4'>{c.message}</div>
				</div>
			))}
		</div>
	);
};

export default PostPage;
