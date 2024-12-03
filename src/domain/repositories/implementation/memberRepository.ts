import { IMemberRepository } from "../interface";
import { IMember, IMemberCreateDTO, MemberRole, MemberStatus } from "../../../application/interfaces/member.interfaces";
import { MemberModel } from "../../../infrastructure";



export class MemberRepository implements IMemberRepository {

    async inviteMember(dto: IMemberCreateDTO): Promise<IMemberCreateDTO> {
        try {
            const member = new MemberModel({
                name: dto.name,
                email: dto.email,
                projects: dto.projects,
                role: dto.role || MemberRole.VIEWER,
                status: MemberStatus.PENDING,
                invitationToken: dto.invitationToken,
                invitedBy: dto.invitedBy
            });

            const savedMember = await member.save();
            console.log('Member saved successfully:', savedMember);
            return savedMember.toObject();

        } catch (error) {
            throw error;
        }
    }


    async findInvitedMembers(inviterId: string): Promise<IMember[]> {
        try {
            return await MemberModel.find({
                invitedBy: inviterId,
            }).lean();
        } catch (error) {
            console.error('Error fetching invited members:', error);
            throw new Error('Unable to fetch invited members');
        }
    }

    
    async findByEmail(email: string): Promise<IMember | null> {
        const member = await MemberModel.findOne({ email }).exec();
        return member ? (member.toObject() as IMember) : null;
    }



    async findByToken(token: string) {
        return MemberModel.findOne({ invitationToken: token });
    }

    async addUserToProject(userId: string, projectIds: string[], role: string) {
        await Promise.all(
            projectIds.map((projectId) =>
                MemberModel.updateOne(
                    { userId, projectId },
                    { $set: { role, status: 'active' } },
                    { upsert: true }
                )
            )
        );
    }

    async updateInvitationStatus(
        invitationToken: string,
        updateData: {
            status: string;
            joinedAt: Date;
        }
    ): Promise<IMember> {
        const updatedMember = (await MemberModel.findOneAndUpdate(
            { invitationToken },
            {
                $set: {
                    status: updateData.status,
                    joinedAt: updateData.joinedAt,
                    invitationToken: null
                }
            },
            { new: true }
        )) as IMember;

        if (!updatedMember) {
            throw new Error('Member not found or invitation already processed');
        }

        return updatedMember;
    }


}  