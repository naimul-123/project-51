import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
	const authInfo = useContext(AuthContext);
	const { user, logOut } = authInfo;
	const navigateToLogin = useNavigate();

	const handleLogOut = () => {
		logOut()
			.then(() => {
				console.log('Log out successfully');
				navigateToLogin('/login');
			})
			.catch((error) => console.log(error.message));
	};

	const navLinks = (
		<>
			{user && (
				<li>
					<NavLink to='/home'>Home</NavLink>
				</li>
			)}
			{!user && (
				<>
					<li>
						<NavLink to='/login'>Log in</NavLink>
					</li>
					<li>
						<NavLink to='/register'>Register</NavLink>
					</li>
				</>
			)}
			{user && (
				<li>
					<NavLink to='/orders'>Orders</NavLink>
				</li>
			)}
		</>
	);
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
						{navLinks}
					</ul>
				</div>
				<a className='btn btn-ghost text-xl'>daisyUI</a>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>{navLinks}</ul>
			</div>
			<div className='navbar-end'>
				{user ? (
					<>
						<span>{user.email}</span>
						<a
							className='btn btn-sm btn-primary'
							onClick={handleLogOut}>
							Sign Out
						</a>
					</>
				) : (
					<Link
						to='/login'
						className='btn btn-sm btn-primary'>
						Log in
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
