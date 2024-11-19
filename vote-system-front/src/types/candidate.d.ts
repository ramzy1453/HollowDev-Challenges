import type { IUser } from './user';

export interface ICandidateRequest {
	skills: string[];
	vision: string;
	candidatureFor: string;
	motivation: string;
}

export type ICandidateResponse = {
	id: string;
	skills: string[];
	vision: string;
	candidatureFor: string;
	motivation: string;
	createdAt: string;
	updatedAt: string;
	user: IUser;
	status: 'pending' | 'accepted' | 'rejected';
};
