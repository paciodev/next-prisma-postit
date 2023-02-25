import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logged from './Logged';
import Login from './Login';

const Navbar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<nav className='flex justify-between items-center py-8'>
			<Link href='/'>
				<h1 className='font-bold text-lg'>Send it.</h1>
			</Link>
			<ul className='flex items-center gap-6'>
				{session?.user ? (
					<Logged image={session.user.image || ''} />
				) : (
					<Login />
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
