import { IMemberRepository } from "../../../domain/repositories";
import { IMemberCreateDTO } from "../../../application/interfaces/member.interfaces";  

export class InviteMemberUseCase {  
    private memberRepository: IMemberRepository;  

    constructor(memberRepository: IMemberRepository) {  
        this.memberRepository = memberRepository;  
    }  

    async execute(dto: IMemberCreateDTO) {  
        return await this.memberRepository.inviteMember(dto);  
        
    }  
}