export interface ISession {
	id: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

export interface ISessionContext {
	session?: ISession;
	setSession: React.Dispatch<React.SetStateAction<ISession | undefined>>;
}