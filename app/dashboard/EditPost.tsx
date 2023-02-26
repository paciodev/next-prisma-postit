'use client';

import { Comment } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Toggle from './Toggle';

type Props = {
	id: string;
	avatar: string;
	name: string;
	title: string;
	comments?: Comment[];
};

const EditPost = ({ avatar, name, title, comments, id }: Props) => {
	const [isModal, setIsModal] = useState<boolean>(false);
	const queryClient = useQueryClient();
	let toastID: string;

	const { mutate } = useMutation(
		async (id: string) =>
			await axios.delete('/api/posts/delete-post', { data: id }),
		{
			onError: (err) => {
				toast.error('An unexpected error occured', { id: toastID });
				console.error(err);
			},
			onSuccess: () => {
				queryClient.invalidateQueries(['my-posts']);
				toast.success('Your post has been deleted', { id: toastID });
			},
		}
	);

	const deletePost = () => {
		toastID = toast.loading('Deleting your post...');
		mutate(id);
	};

	return (
		<>
			<div className='bg-white my-8 p-8 rounded-lg'>
				<div className='flex items-center gap-2'>
					<Image
						width={32}
						height={32}
						src={avatar}
						alt={`${name}'s avatar`}
						className='rounded-full'
					/>
					<h3 className='font-bold text-gray-700'>{name}</h3>
				</div>
				<div className='my-8'>
					<p className='break-all'>{title}</p>
				</div>
				<div className='flex items-center gap-4'>
					{/* TODO: CHANGE TO SLUG */}
					<Link href={`/post/${id}`}>
						<p className='text-sm font-bold text-gray-700'>
							{comments?.length} Comment{comments?.length !== 1 && 's'}
						</p>
					</Link>
					<button
						className='text-sm font-bold text-red-500'
						onClick={() => setIsModal(true)}
					>
						Delete
					</button>
				</div>
			</div>
			{isModal ? (
				<Toggle deletePost={deletePost} setToggle={setIsModal} />
			) : null}
		</>
	);
};

export default EditPost;
