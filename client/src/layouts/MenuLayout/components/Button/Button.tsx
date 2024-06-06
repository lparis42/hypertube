import { useLocation, useNavigate } from 'react-router-dom';

import { IButton } from './Button.interface';

import './Button.style.css';

export default function Button({ to, value }: IButton) {
	const navigate = useNavigate();
	const location = useLocation();

	const isOnRoute = location.pathname === to;

	return (
		<button onClick={() => navigate(to)} className={`menu_layout-button secondary no-select${isOnRoute ? ' active' : ''}`}>
			{value}
		</button>
	)
}