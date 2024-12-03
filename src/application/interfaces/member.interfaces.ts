import { Types } from 'mongoose';  
import { User } from '../../domain/entities';  
import { Project } from '../../domain/entities';

export enum MemberRole {  
  OWNER = 'owner',  
  ADMIN = 'admin',  
  EDITOR = 'editor',  
  VIEWER = 'viewer'  ,
  DEFAULT = "default", 
}  

export enum MemberStatus { 
  ACCEPTED = "accepted", 
  ACTIVE = 'active',  
  PENDING = 'pending',  
  SUSPENDED = 'suspended',  
}  

export interface IMember {  
  _id: Types.ObjectId;  
  project: Types.ObjectId | Project;  
  user: Types.ObjectId | User;  
  role: MemberRole;  
  status: MemberStatus;  
  joinedAt: Date;  
  lastActivity?: Date;  
}  

  
export interface IMemberDetailed extends IMember {  
  permissions: IMemberPermissions;  
  invitationToken?: string;  
  invitedBy?: Types.ObjectId | User;  
}  

 
export interface IMemberPermissions {  
  canCreateTasks: boolean;  
  canAssignTasks: boolean;  
  canDeleteProject: boolean;  
  canEditProject: boolean;  
  canManageMembers: boolean;  
}  
 
export interface IMemberCreateDTO {  
  name:string;
  projects: string[]; 
  email: string;  
  role?: MemberRole;  
  status?:MemberStatus;
  invitationToken?: string;  
  invitedBy?: string;  
}  


export interface IMemberUpdateDTO {  
  role?: MemberRole;  
  status?: MemberStatus;  
  permissions?: Partial<IMemberPermissions>;  
}  


export interface IMemberFilter {  
  project?: string;  
  role?: MemberRole;  
  status?: MemberStatus;  
  user?: string;  
}  


export interface IMemberInvitation {  
  id?: string;  
  email: string;  
  project: string;  
  invitationToken: string;  
  expiresAt: Date;  
  status: 'pending' | 'accepted' | 'expired';  
}  

 
export interface IMemberSearchResult {  
  _id: string;  
  user: {  
    _id: string;  
    name: string;  
    email: string;  
    profilePicture?: string;  
  };  
  role: MemberRole;  
  status: MemberStatus;  
}  


export interface IMemberStats {  
  totalMembers: number;  
  activeMembers: number;  
  pendingInvitations: number;  
  membersByRole: {  
    [key in MemberRole]: number;  
  };  
  recentlyJoined: IMemberSearchResult[];  
}  


export interface IMemberAuditLog {  
  memberId: string;  
  actorId: string;  
  action: 'invite' | 'role_change' | 'remove' | 'suspend';  
  timestamp: Date;  
  details: {  
    previousRole?: MemberRole;  
    newRole?: MemberRole;  
    previousStatus?: MemberStatus;  
    newStatus?: MemberStatus;  
  };  
}  


export interface IMemberInvitationEmailContext {  
  projectName: string;  
  inviterName: string;  
  invitationLink: string;  
  role: MemberRole;  
}  

 
  
export interface IMemberInviteResponse {  
  member: IMemberDetailed;  
  message: string;  
}  

export interface IMemberListResponse {  
  members: IMemberSearchResult[];  
  total: number;  
  page: number;  
  limit: number;  
}