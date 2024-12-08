import { Types } from 'mongoose';
export interface ProjectMemberDTO {
    userId: Types.ObjectId;
    name: string;
    email: string;
    teams: {
      teamId: Types.ObjectId;
      teamName: string;
    }[];
  }