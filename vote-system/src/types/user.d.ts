export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreateBody = Omit<IUser, "id" | "createdAt" | "updatedAt">;
