import { v4 as uuidv4 } from 'uuid';

import { AuthInputInterface } from './AuthInput.interface';

export default function AuthInput({ name, type, value, placeholder, errors, onChange }: AuthInputInterface) {
	return (
		<div className={`input-div${errors.length > 0 ? ' error' : ''}`}>
			<input
				name={name}
				value={value}
				placeholder={placeholder}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				type={type}
				onChange={onChange}
				required />
				{
					errors.length > 0 &&
					<div className='errors-div'>
						<ul>
							{ errors.map((e) => <li key={uuidv4()}>{e}</li>) }
						</ul>
					</div>
				}
		</div>
	);
}