import { IBodyLayout } from './BodyLayout.interface';

import './BodyLayout.style.css';

export default function BodyLayout({ children }: IBodyLayout) {
	return (
		<div className='body_layout-div'>
			<div className='body_layout-content'>
				{ children }
			</div>
		</div>
	);
}