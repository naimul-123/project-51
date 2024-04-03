import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
	const [regMsg, setRegMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const authInfo = useContext(AuthContext);
	const { createUser } = authInfo;
	const navigateToLogin = useNavigate();

	const handleResister = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;

		const password = e.target.password.value;
		if (password.length < 6) {
			setErrorMsg('Password must be at least 6 charecter');
			return;
		}
		if (!/[A-Z]/.test(password)) {
			setErrorMsg('Password must be at least One upercase letter');
			return;
		}
		createUser(email, password)
			.then((result) => {
				console.log(result.user);
				setRegMsg('Register success');
				e.target.reset();
				navigateToLogin('/login');
			})
			.catch((error) => setErrorMsg(error.message));
		console.log(name, email, password);
		// e.target.name.value = '';
		// e.target.email.value = '';
		// e.target.password.value = '';
	};
	return (
		<div className='hero min-h-[calc(100vh-68px)] bg-base-200'>
			<div className='hero-content flex-col '>
				<div className='text-center '>
					<h1 className='text-3xl font-bold text-secondary'>Register now!</h1>
				</div>
				<div className='card shrink-0 w-full max-w-lg mx-auto shadow-2xl bg-base-100'>
					<form
						className='card-body'
						onSubmit={handleResister}>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Name</span>
							</label>
							<input
								type='text'
								placeholder='Your Name'
								className='input input-bordered'
								required
								name='name'
							/>
						</div>
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
							<button className='btn btn-primary'>Register</button>
						</div>
						<div className='form-control mt-6'>
							<p>
								Already have an account? please{' '}
								<Link
									to='/login'
									className='font-bold text-secondary'>
									Login here
								</Link>
							</p>
							{regMsg && <p className='text-green-600'>{regMsg}</p>}
							{errorMsg && <p className='text-red-600'>{errorMsg}</p>}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
