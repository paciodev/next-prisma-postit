'use client';

type Props = { deletePost: () => void; setToggle: (toggle: boolean) => void };

const Toggle = ({ deletePost, setToggle }: Props) => {
	return (
		<div
			onClick={() => setToggle(false)}
			className='fixed bg-black/50 w-full h-full z-20 inset-0'
		>
			<div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 text-center'>
				<h2 className='text-xl'>Are you sure you want to delete this post?</h2>
				<h3 className='text-red-500'>
					Pressing the delete button will permanently delete your post
				</h3>
				<button
					className='bg-red-600 text-sm text-white py-2 px-4 rounded-lg'
					onClick={deletePost}
				>
					Delete post
				</button>
			</div>
		</div>
	);
};

export default Toggle;
