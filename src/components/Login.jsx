import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
	const [signInMsg, setSignMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const authInfo = useContext(AuthContext);
	const { signInUser, signInWithGoogle } = authInfo;
	const navigatetoHome = useNavigate();
	const handleLogIn = (e) => {
		e.preventDefault();
		setErrorMsg('');
		setSignMsg('');
		const email = e.target.email.value;
		const password = e.target.password.value;
		signInUser(email, password)
			.then(() => setSignMsg('Success!'))
			.catch((error) => setErrorMsg(error.message));
		e.target.reset();
		navigatetoHome('/home');
	};

	const handleLogInWithGoogle = () => {
		signInWithGoogle()
			.then(() => setSignMsg('Success!'))
			.catch((error) => setErrorMsg(error.message));
		navigatetoHome('/home');
	};
	return (
		<div className='hero min-h-[calc(100vh-68px)] bg-base-200'>
			<div className='hero-content flex-col '>
				<div className='text-center lg:text-left'>
					<h1 className='text-3xl font-bold text-secondary'>Login now!</h1>
				</div>
				<div className='card shrink-0 w-full max-w-lg mx-auto shadow-2xl bg-base-100'>
					<form
						className='card-body'
						onSubmit={handleLogIn}>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='email'
								placeholder='email'
								className='input input-bordered'
								required
								name='email'
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<input
								type='password'
								placeholder='password'
								className='input input-bordered'
								required
								name='password'
							/>
							<label className='label'>
								<a
									href='#'
									className='label-text-alt link link-hover'>
									Forgot password?
								</a>
							</label>
						</div>
						<div className='form-control mt-6'>
							<button className='btn btn-primary'>Login</button>
						</div>
						<div className='form-control mt-6'>
							<span
								className='btn btn-link'
								onClick={handleLogInWithGoogle}>
								Google
							</span>
							<p>
								Are you new in this website? please{' '}
								<Link
									to='/register'
									className='font-bold text-secondary'>
									Register now
								</Link>
							</p>

							{signInMsg && <p className='text-green-600'>{signInMsg}</p>}
							{errorMsg && <p className='text-red-600'>{errorMsg}</p>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
