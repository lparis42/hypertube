import React from 'react';
import { Navigate } from 'react-router-dom';

import useSession from '@/hooks/session.hook';

import { IOptions } from './withProtection.interface';

const withProtection = <T extends Record<string, string>>(
	WrappedComponent: React.ComponentType<T>,
	options: IOptions
) => {
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	const ComponentWithProtection = (props: T) => {
		const session = useSession();

		if (!!session.session != !!options.authenticated)
			return <Navigate to={options.fallback} replace />;

		return <WrappedComponent {...(props as T)} />;
	};

	ComponentWithProtection.displayName = `withProtection(${displayName})`;

	return ComponentWithProtection;
}

export default withProtection;