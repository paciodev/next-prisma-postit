'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

type Comment = {
	postId: string;
	title: string;
};

const AddComment = ({ id }: { id: string }) => {
	const [title, setTitle] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const queryClient = useQueryClient();
	let toastID: string;

	const { mutate } = useMutation(
		async (data: Comment) => axios.post('/api/posts/add-comment', { data }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['detail-post']);
				toast.success('Successfully added your comment', { id: toastID });
				setTitle('');
				setIsDisabled(false);
			},
			onError: (err) => {
				setIsDisabled(false);
				if (err instanceof AxiosError) {
					toast.error(err?.response?.data.message, { id: toastID });
				} else {
					toast.error('An unexpected error occured', { id: toastID });
				}
			},
		}
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsDisabled(false);
		toastID = toast.loading('Adding your comment...');
		mutate({ title: title.trim(), postId: id });
	};

	return (
		<form className='my-8' onSubmit={handleSubmit}>
			<h3 className='text-center font-bold'>Add a comment</h3>
			<div className='flex flex-col my-2'>
				<input
					type='text'
					name='title'
					className='p-4 text-lg rounded-md my-2'
					value={title}
					placeholder='I really like your post!'
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className='flex items-center gap-2'>
				<button
					disabled={isDisabled}
					className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
					type='submit'
				>
					Add Comment
				</button>
				<p
					className={`font-bold ${
						title.length > 300 ? 'text-red-700' : 'text-gray-700'
					}`}
				>
					{title.length}/300
				</p>
			</div>
		</form>
	);
};

export default AddComment;
