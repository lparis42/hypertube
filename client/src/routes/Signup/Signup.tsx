import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import withProtection from '@/hoc/withProtection/withProtection';

import AuthInput from '@/components/AuthInput/AuthInput';

import { IValues, IErrors } from './Signup.interface';

import './Signup.style.css';

function Signup() {
	const navigate = useNavigate();

	const [values, setValues] = useState<IValues>({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		confirm_password: ''
	});

	const [errors, setErrors] = useState<IErrors>({
		first_name: [],
		last_name: [],
		username: [],
		email: [],
		password: [],
		confirm_password: []
	});

	const disable = Object.values(values).some(value => value.length == 0);

	const resetInputs = () => {
		setValues({
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password: '',
			confirm_password: ''
		});
		setErrors({
			first_name: [],
			last_name: [],
			username: [],
			email: [],
			password: [],
			confirm_password: []
		});
	}

	const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;

		setValues({
			...values,
			[name]: value
		});
	}

	const handleErrors = (e: unknown) => {
		console.log('ERRORS: ', e)
  };

	const onContinue = async () => {
		try {
			// ADD SIGN UP HERE

			navigate('/signin');
			resetInputs();
		} catch (e: unknown) {
			handleErrors(e);
		}
	}

	return (
		<div className='sign_in-div'>
			<div className='sign_in-content'>
				<div className='header-div'>
					<h1 className='no-select'>Sign up</h1>
				</div>
				<div className='inputs-div'>
					<AuthInput
						name='first_name'
						placeholder='First name'
						type='text'
						onChange={handleValue}
						value={values.first_name}
						errors={errors.first_name} />
					<AuthInput
						name='last_name'
						placeholder='Last name'
						type='text'
						onChange={handleValue}
						errors={errors.last_name} />
					<AuthInput
						name='username'
						placeholder='Username'
						type='text'
						onChange={handleValue}
						errors={errors.username} />
					<AuthInput
						name='email'
						placeholder='Email'
						type='text'
						onChange={handleValue}
						errors={errors.email} />
					<AuthInput
						name='password'
						placeholder='Password'
						type='password'
						onChange={handleValue}
						errors={errors.password} />
					<AuthInput
						name='confirm_password'
						placeholder='Confirm password'
						type='password'
						onChange={handleValue}
						errors={errors.confirm_password} />
				</div>
				<div className='continue-div'>
					<button
						className={`continue primary no-select${disable ? ' disable' : ''}`}
						onClick={onContinue}>
						Continue
					</button>
				</div>
				<div className="separator-div">
					<div />
					<span className='no-select'>or</span>
					<div />
				</div>
				<div className="option-div">
					<Link className="no-select" to={"/signin"}>Already have an account? Sign in</Link>
				</div>
			</div>
		</div>
	);
}

const ProtectedSignup = withProtection(Signup, { authenticated: false, fallback: '/' });

export default ProtectedSignup;