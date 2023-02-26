'use client';

import { MyPosts as Posts, Post } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EditPost from './EditPost';

const fetchMyPosts = async () => {
	const res = await axios.get('/api/posts/get-my-posts');
	return res.data;
};

const MyPosts = () => {
	const { data, isLoading } = useQuery<Posts>({
		queryFn: fetchMyPosts,
		queryKey: ['my-posts'],
	});

	if (isLoading) return <h1>Loading...</h1>;
	return (
		<div>
			{data?.Post.map((p) => (
				<EditPost
					key={p.id}
					id={p.id}
					avatar={data.image}
					name={data.name}
					title={p.title}
					comments={p.comments}
				/>
			))}
			{!data?.Post.length && (
				<h3 className='mt-8 font-bold text-center'>You don't have any posts</h3>
			)}
		</div>
	);
};

export default MyPosts;
