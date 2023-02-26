'use client';

import { type Post as PostType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AddPost from './AddPost';
import Post from './Post';

const posts = async () => {
	const res = await axios.get('/api/posts/get-posts');
	return res.data;
};

export default function Home() {
	const { data, error } = useQuery({
		queryFn: posts,
		queryKey: ['posts'],
	});

	// TODO: Change it
	if (error) {
		console.error(error);
	}

	return (
		<main className='text-lg py-5'>
			<AddPost />

			{data ? (
				<>
					{data.map((post: PostType) => (
						<Post
							key={post.id}
							id={post.id}
							name={post.author.name}
							avatar={post.author.image}
							postTitle={post.title}
							comments={post.comments}
						/>
					))}
				</>
			) : (
				// TODO: Change this to spinner
				<div>Loading...</div>
			)}
		</main>
	);
}
