export type IResponse<T> = Promise<{
	success: boolean;
	message: string;
	data: T;
}>;
