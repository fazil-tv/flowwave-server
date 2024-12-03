import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

dotenv.config();

import { IMemberCreateDTO, MemberStatus } from '../../../application/interfaces/member.interfaces';
import { IMemberRepository } from '../../../domain/repositories';

import { InviteMemberUseCase } from '../../../application/usecases/members/InviteMemberUseCase';
import { MemberRole } from '../../../infrastructure';
import { sendInvitationEmail } from '../../../infrastructure/services/utils/InvitiationEmailServices';
import { GetInvitedMembersUseCase } from '../../../application/usecases/members/getmembers';
import { AcceptInvitationUseCase } from '../../../application/usecases/members/acceptinvitiationusecases';

export class MemberController {

    
    constructor(
        
        private memberRepository : IMemberRepository,
        private inviteMemberUseCase: InviteMemberUseCase,
        private getInvitedMembersUseCase:GetInvitedMembersUseCase,
        private acceptInvitationUseCase:AcceptInvitationUseCase

    ) { }

    async inviteMember(req: any, res: Response) {
        try {
            const { name, email, projects, role } = req.body.formData;
            const invitedBy = req.user?.id;


            if (!invitedBy) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            if (!name || !email || !projects || projects.length === 0) {
                return res.status(400).json({ message: 'Invalid input: Name, email, and projects are required' });
            }

            const existingMember = await this.memberRepository.findByEmail(email);
            if (existingMember) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const invitationTokens = randomBytes(32).toString('hex');


            const memberDTO: IMemberCreateDTO = {
                name,
                email,
                projects,
                role: role || MemberRole.VIEWER,
                status: MemberStatus.PENDING,
                invitationToken: invitationTokens,
                invitedBy
            };


            const member = await this.inviteMemberUseCase.execute(memberDTO);

            await sendInvitationEmail(email, invitationTokens);

            res.status(201).json(member);
        } catch (error) {
            console.error('Error inviting member:', error);
            res.status(400).json({ message: 'Failed to invite member', error });
        }
    }



     async acceptInvitation(req: any, res: Response) {
        try {
            
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({ success: false, message: 'Token is required' });
            }

            const result = await this.acceptInvitationUseCase.execute(token);


            // if (result.success) {
            //     return res.status(200).json({ success: true, message: result });
            // } else {
            //     return res.status(400).json({ success: false, message: result });
            // }


        } catch (error) {
            console.error('Error in acceptInvitation:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }


    async getInvitedMembers(req: any, res: Response) {
        try {
          const inviterId = req.user?.id; 
          
          if (!inviterId) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
    
          const invitedMembers = await this.getInvitedMembersUseCase.execute(inviterId);
          
          res.status(200).json({
            message: 'Invited members retrieved successfully',
            data: invitedMembers
          });
        } catch (error) {
          res.status(500).json({ 
            message: 'Error retrieving invited members',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

}
