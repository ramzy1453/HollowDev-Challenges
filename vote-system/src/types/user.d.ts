export type IUser = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRegisterBody = Omit<IUser, "id" | "createdAt" | "updatedAt"> & {
  confirmPassword: string;
};
export type UserUpdateBody = Partial<UserRegisterBody>;
export type UserLoginBody = {
  email: string;
  password: string;
};
