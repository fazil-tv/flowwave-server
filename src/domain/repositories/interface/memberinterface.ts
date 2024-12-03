import { IMember } from "../../../application/interfaces/member.interfaces";
import { IMemberCreateDTO } from "../../../application/interfaces/member.interfaces";
export interface IMemberRepository {  
    inviteMember(dto: IMemberCreateDTO): Promise<IMemberCreateDTO>;  
    findByEmail(email: string): Promise<IMember | null>;
    findInvitedMembers(inviterId: string): Promise<IMember[]>;
    findByToken(token: string): Promise<any>;
    addUserToProject(userId: string, projectIds: string[], role: string): Promise<void>;
    updateInvitationStatus(
        invitationToken: string, 
        updateData: {
            status: string;joinedAt: Date;
        }
    ): Promise<IMember>;
}