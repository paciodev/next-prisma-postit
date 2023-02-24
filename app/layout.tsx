import './globals.css';
import Navbar from './Navbar';

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
			{/* @ts-expect-error Server Component */}
			<Navbar />
			<body>{children}</body>
		</html>
	);
}
