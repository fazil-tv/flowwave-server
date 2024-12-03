import { IMember } from "../../../application/interfaces/member.interfaces";
import { IMemberRepository } from "../../../domain/repositories/interface";


export class GetInvitedMembersUseCase {
  constructor(private memberRepository: IMemberRepository) {}

  async execute(inviterId: string): Promise<IMember[]> {

    return this.memberRepository.findInvitedMembers(inviterId);
  }
}