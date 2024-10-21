import { IUser } from "./user";

type Position =
  | "team-leader"
  | "team-assistant"
  | "web-lead"
  | "mobile-lead"
  | "ai-lead"
  | "cybersecurity-lead";

export interface ICandidate {
  id: string;
  user: IUser;
  skills: string[];
  motivation: string;
  candidature: string;
  candidateFor: Position[];
}
