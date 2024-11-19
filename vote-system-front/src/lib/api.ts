import type { ILoginRequest, IRegisterRequest, IUserRegistrationResponse } from '../types/auth';
import type { IResponse } from '../types';
import type { ICandidateRequest, ICandidateResponse } from '../types/candidate';

const BASE_URL = 'http://localhost:7000/api/v1';

export async function login(body: ILoginRequest): IResponse<IUserRegistrationResponse> {
	const response = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	return response.json();
}

export async function register(body: IRegisterRequest): IResponse<IUserRegistrationResponse> {
	const response = await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	return response.json();
}

export async function candidate(
	accessToken: string | undefined,
	body: ICandidateRequest
): IResponse<ICandidateResponse[]> {
	const response = await fetch(`${BASE_URL}/candidature`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify(body)
	});

	return response.json();
}

export async function getAcceptedCandidates(accessToken: string): IResponse<ICandidateResponse[]> {
	const response = await fetch(`${BASE_URL}/candidature`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
}

export async function getCandidates(accessToken: string): IResponse<ICandidateResponse[]> {
	const response = await fetch(`${BASE_URL}/candidature/all`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
}

export async function vote(
	accessToken: string,
	candidateId: string
): IResponse<ICandidateResponse[]> {
	const response = await fetch(`${BASE_URL}/vote/${candidateId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
}

// Admin
export async function acceptCandidature(accessToken: string, candidateId: string): IResponse<null> {
	const response = await fetch(`${BASE_URL}/candidature/accept/${candidateId}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
}

// Admin
export async function rejectCandidature(accessToken: string, candidateId: string): IResponse<null> {
	const response = await fetch(`${BASE_URL}/candidature/reject/${candidateId}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	return response.json();
}

// Admin
// implement vote count
export async function getVotesCount(accessToken: string, candidateId: string): IResponse<number> {
	const response = await fetch(`${BASE_URL}/vote/count/${candidateId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return response.json();
}
