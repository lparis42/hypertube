import useSession from '@/hooks/session.hook';

import Button from './components/Button/Button';

import { IMenuLayout } from './MenuLayout.interface';

import './MenuLayout.style.css';

export default function MenuLayout({ menu, setMenu }: IMenuLayout) {
	const { setSession } = useSession();

	const logout = () => {
		setMenu(false);
		setSession(undefined);
	}

	return (
		<div className={`menu_layout-div${menu ? ' active' : ''}`}>
			<div className='menu_layout-flex'>
				<div className='menu_layout-background' onClick={() => { setMenu(false); }} />
				<div className='menu_layout-content'>
					<div className='menu_layout-header'>
						<div className='searchbar-input'>
							<input placeholder="Search" />
						</div>
					</div>
					<div className='menu_layout-body'>
						<Button to='/' value='Home' />
						<Button to='/profile' value='Profile' />
						<Button to='/library' value='Library' />
						<button onClick={logout} className='no-select'>
							Logout
						</button>
					</div>
				</div>
				<div className='menu_layout-close'></div>
			</div>
		</div>
	);
}