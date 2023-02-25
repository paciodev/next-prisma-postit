import './globals.css';
import Navbar from './Navbar';
import QueryWrapper from './QueryWrapper';

export const metadata = {
	title: 'Just post it!',
	description: 'Just post it!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='mx-4 md:mx-48 xl:mx-96 bg-gray-200'>
				<QueryWrapper>
					{/* @ts-expect-error Server Component */}
					<Navbar />
					{children}
				</QueryWrapper>
			</body>
		</html>
	);
}
