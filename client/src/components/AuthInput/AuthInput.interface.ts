export interface AuthInputInterface {
	name: string;
	value?: string;
	type: string;
	placeholder: string;
	errors: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}