export interface IValues {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	confirm_password: string;
}

export interface IErrors {
	first_name: string[];
	last_name: string[];
	username: string[];
	email: string[];
	password: string[];
	confirm_password: string[];
}