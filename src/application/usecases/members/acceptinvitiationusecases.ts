import { IMemberRepository } from "../../../domain/repositories";
import { IUserRepository } from "../../../domain/repositories";

export class AcceptInvitationUseCase {
    constructor(
        private memberRepository: IMemberRepository,
        private userRepository: IUserRepository
    ) { }

    async execute(invitationToken: string) {

        const invitation = await this.memberRepository.findByToken(invitationToken);

        if (!invitation) {
            return { success: false, message: 'Invalid invitation token' };
        }

        if (invitation.status === 'accepted') {
            throw new Error('Invitation already accepted');
        }

        try {

            const updatedInvitation = await this.memberRepository.updateInvitationStatus(
                invitationToken,
                {
                    status: 'accepted',
                    joinedAt: new Date()
                }
            );

            return {
                success: true,
                message: 'Invitation accepted successfully',
                data: updatedInvitation
            };
        } catch (error) {
            console.error('Error accepting invitation:', error);
            return {
                success: false,
                message: 'Failed to accept invitation',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // const existingUser = await this.userRepository.findByEmail(invitation.email);


    // if (existingUser) {
    //     await this.memberRepository.addUserToProject(existingUser._id, invitation.projects, invitation.role);
    //     return { success: true, message: 'Invitation accepted and project updated' };
    // } 

    // else {

    // const newUser = await this.userRepository.create({

    //     name: invitation.name,
    //     email: invitation.email,
    //     password: null,
    // });


    // await this.memberRepository.addUserToProject(newUser._id, invitation.projects, invitation.role);
    // return { success: true, message: 'Invitation accepted and user created' };
    // }
}
