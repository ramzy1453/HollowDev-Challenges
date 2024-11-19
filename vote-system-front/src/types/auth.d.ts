import type { IUser } from './user';

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IUserRegistrationResponse {
	user: IUser;
	accessToken: string;
}

export type IAuth = Partial<IUserRegistrationResponse> 