import { Router } from "express";
const router = Router();
import { MemberController } from "../controllers/memberController/memberController";
import authMiddleware from "../middleware/authMiddleware";


import { MemberRepository } from "../../domain/repositories/implementation/memberRepository";
import { InviteMemberUseCase } from "../../application/usecases/members/InviteMemberUseCase";
import { GetInvitedMembersUseCase } from "../../application/usecases/members/getmembers";
import { AcceptInvitationUseCase } from "../../application/usecases/members/acceptinvitiationusecases";
import { UserRepository } from "../../domain/repositories";

const userRepository = new UserRepository();
const memberRepository = new MemberRepository();
const inviteMemberUseCase = new InviteMemberUseCase(memberRepository);
const getInvitedMembersUseCase = new GetInvitedMembersUseCase(memberRepository);
const acceptInvitationUseCase = new AcceptInvitationUseCase(memberRepository,userRepository);


const memberController = new MemberController(
    memberRepository,
    inviteMemberUseCase,
    getInvitedMembersUseCase,
    acceptInvitationUseCase,
);

router.post('/invite', authMiddleware, (req, res) => {
    memberController.inviteMember(req,res)
})
router.post('/accept-invitation', (req, res) => {
    memberController.acceptInvitation(req,res)
})
router.get('/members', authMiddleware, (req, res) => {
    memberController.getInvitedMembers(req,res)
})



export default router;

