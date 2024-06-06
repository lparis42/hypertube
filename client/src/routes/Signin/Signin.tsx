import { useState } from 'react';
import { Link } from 'react-router-dom';

import withProtection from '@/hoc/withProtection/withProtection';

import AuthInput from '@/components/AuthInput/AuthInput';

import { IValues, IErrors } from './Signin.interface';

import './Signin.style.css';
import useSession from '@/hooks/session.hook';


function Signin() {
	const { setSession } = useSession();

	const [values, setValues] = useState<IValues>({
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState<IErrors>({
		username: [],
		password: [],
	});

	const disable = Object.values(values).some(value => value.length == 0);

	const resetInputs = () => {
		setValues({
			username: '',
			password: '',
		});
		setErrors({
			username: [],
			password: [],
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
			// ADD SIGN IN HERE
			setSession({
				id: "thisisid",
				username: "username",
				first_name: "Firstname",
				last_name: "Lastname",
				email: "username@something.com"
			});

			resetInputs();
		} catch (e: unknown) {
			handleErrors(e);
		}
	}

	return (
		<div className='sign_in-div'>
			<div className='sign_in-content'>
				<div className='header-div'>
					<h1 className='no-select'>Sign in</h1>
				</div>
				<div className='inputs-div'>
					<AuthInput
						name='username'
						placeholder='Username'
						type='text'
						onChange={handleValue}
						errors={errors.username} />
					<AuthInput
						name='password'
						placeholder='Password'
						type='password'
						onChange={handleValue}
						errors={errors.password} />
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
					<Link className="no-select" to={"/signup"}>Don't have an account yet? Sign up</Link>
				</div>
			</div>
		</div>
	);
}

const ProtectedSignin = withProtection(Signin, { authenticated: false, fallback: '/' });

export default ProtectedSignin;