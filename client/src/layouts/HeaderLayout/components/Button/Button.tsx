import { useLocation, useNavigate } from 'react-router-dom';

import { IButton } from './Button.interface';

export default function Button({ className, value, to }: IButton) {
	const navigate = useNavigate();
	const location = useLocation();

	const isOnRoute = location.pathname === to;

	if (isOnRoute) {
		return null;
	}

	return (
		<button
			onClick={() => navigate(to)}
			className={`${className.length > 0 ? `${className} ` : ''}no-select`}>
			{value}
		</button>
	)
}