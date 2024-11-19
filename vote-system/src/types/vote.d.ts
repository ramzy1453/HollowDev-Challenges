import { Types } from "mongoose";

export type IVote = {
  id: Types.ObjectId;
  candidate: Types.ObjectId;
  user: Types.ObjectId;
  candidatureFor : 'P' | 'VP' | 'SG' | 'SGA'; 
};
