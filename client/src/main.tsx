import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

import Home from '@/routes/Home/Home';
import Signin from '@/routes/Signin/Signin';
import Signup from '@/routes/Signup/Signup';

import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/signin',
				element: <Signin />
			},
			{
				path: '/signup',
				element: <Signup />
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);