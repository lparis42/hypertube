import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderLayout from '@/layouts/HeaderLayout/HeaderLayout';
import BodyLayout from '@/layouts/BodyLayout/BodyLayout';
import MenuLayout from '@/layouts/MenuLayout/MenuLayout';

import './App.css';

function App() {
	const [menu, setMenu] = useState<boolean>(false);

  return (
		<div className='app-div'>
				<HeaderLayout
					menu={menu}
					setMenu={setMenu} />
				<div className='app-content'>
					<BodyLayout>
						<Outlet />
					</BodyLayout>
					<MenuLayout
						menu={menu}
						setMenu={setMenu} />
				</div>
		</div>
  )
}

export default App;
