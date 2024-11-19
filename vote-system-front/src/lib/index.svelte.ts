import type { IAuth } from '../types/auth';
import type { IUser } from '../types/user';

const isBrowser = typeof window !== 'undefined';

export function setInLocalStorage<T>(key: string, value: T) {
	if (isBrowser) {
		localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
	}
}

export function removeFromLocalStorage(key: string) {
	if (isBrowser) {
		localStorage.removeItem(key);
	}
}

export function clearLocalStorage() {
	if (isBrowser) {
		localStorage.clear();
	}
}

export function initLocalStorage() {
	if (isBrowser) {
		const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser | undefined;
		const accessToken = localStorage.getItem('accessToken') || '';
		return { user, accessToken };
	} else {
		return { user: undefined, accessToken: '' };
	}
}

const { user, accessToken } = initLocalStorage();
console.log(initLocalStorage());

export const auth: IAuth = $state({
	user,
	accessToken
});
