import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(data: { userId: string }): Promise<string> {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}

export async function verifyToken<T>(token: string): Promise<T> {
  return jwt.verify(token, process.env.JWT_SECRET as string) as T;
}
