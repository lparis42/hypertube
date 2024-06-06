import React, { useState } from "react";

import { ISession } from "@/context/session/session-context.interface";

import { ISessionProvider } from "./session-provider.interface";
import { SessionContext } from "@/context/session/session-context";

export const SessionProvider = ({ children }: ISessionProvider) => {
	const [session, setSession] = useState<ISession | undefined>(undefined);

	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		let isReady = true;

		/*
		setSession({
			id: "thisisid",
			username: "guysharony",
			first_name: "Guy",
			last_name: "Sharony",
			email: "username@something.com"
		});
		*/

		setSession(undefined);

		return () => {
			isReady = false
		};
	}, [setSession]);

	return (
		<SessionContext.Provider value={{
			session: session,
			setSession: setSession
		}}>
			{children}
		</SessionContext.Provider>
	);
};