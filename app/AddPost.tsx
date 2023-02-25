'use client';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddPost = () => {
	const [text, setText] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	let toastPostID: string;

	const { mutate } = useMutation(
		async (title: string) =>
			await axios.post('/api/posts/add-post', {
				title: title.trim(),
			}),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, { id: toastPostID });
				}
				setIsDisabled(false);
			},
			onSuccess: () => {
				toast.success('Post has been published', { id: toastPostID });
				setText('');
				setIsDisabled(false);
			},
		}
	);

	const submitPost = async (e: React.FormEvent) => {
		e.preventDefault();
		toastPostID = toast.loading('Publishing your post...');
		setIsDisabled(true);
		mutate(text);
	};

	return (
		<form className='bg-white my-8 p-8 rounded-md' onSubmit={submitPost}>
			<div className='flex flex-col my-4'>
				<textarea
					name='title'
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="What's in your mind?"
					className='p-4 text-lg rounded-md my-2 bg-gray-200 outline-none'
				/>
			</div>
			<div className='flex items-center justify-between gap-2'>
				<p
					className={`font-bold text-sm ${
						text.length > 300 ? 'text-red-700' : 'text-gray-700'
					}`}
				>
					{text.length}/300
				</p>
				<button
					disabled={isDisabled}
					type='submit'
					className='text-sm text-white bg-teal-600 py-2 px-6 rounded-xl disabled:opacity-25'
				>
					Create a post
				</button>
			</div>
		</form>
	);
};

export default AddPost;
