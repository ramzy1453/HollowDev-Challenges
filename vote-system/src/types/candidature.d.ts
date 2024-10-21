import { IUser } from "./user";

type Position =
  | "team-leader"
  | "team-assistant"
  | "web-lead"
  | "mobile-lead"
  | "ai-lead"
  | "cybersecurity-lead";

export interface ICandidature {
  id: string;
  user: IUser;
  skills: string[];
  motivation: string;
  vision: string;
  candidatureFor: Position;
}

export type CreateCandidatureBody = Omit<ICandidature, "id" | "user">;
export type UpdateCandidatureBody = Partial<CreateCandidatureBody>;
