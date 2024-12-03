import { ITeamRepository } from '../../../domain/repositories/interface/teaminterface';  
import { BaseResponseDto } from '../../../application/dtos/common/BaseResponseDto';  
import { ITeam } from '../../interfaces/team.interfaces';  

export class GetTeamsByCreatorUseCase {  
    constructor(private teamRepository: ITeamRepository) { }  

    public async execute(createdBy: string): Promise<BaseResponseDto<ITeam[] | null>> {  
        try {  
            const teams = await this.teamRepository.getTeamsByCreator(createdBy);  
            if (teams.length === 0) {  
                return BaseResponseDto.notFound('No teams found for this user.');  
            }  
            return BaseResponseDto.success(teams, 'Teams retrieved successfully.');  
        } catch (error) {  
            console.error('Error in GetTeamsByCreatorUseCase:', error);  
            return BaseResponseDto.serverError('An error occurred while retrieving teams.');  
        }  
    }  
}