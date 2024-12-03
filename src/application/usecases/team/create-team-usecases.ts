import { ITeamRepository } from '../../../domain/repositories/interface/teaminterface';  
import { TeamModel } from '../../../infrastructure/database/mongoose/models/teamModel';  
import { BaseResponseDto } from '../../../application/dtos/common/BaseResponseDto';  
import { ITeam } from '../../interfaces/team.interfaces';  

export class CreateTeamUseCase {  
    constructor(private teamRepository: ITeamRepository) { }  

    public async execute(teamData: {  
        TeamName: string;  
        Description?: string;  
        TeamLead?: string;  
        memberIds: string[];  
        createdBy: string;  
    }): Promise<BaseResponseDto<ITeam | null>> {  
        try {  
            const existingTeam = await this.teamRepository.findByName(teamData.TeamName);  
            if (existingTeam) {  
                return BaseResponseDto.badRequest('A team with this name already exists.');  
            }  

            
            const newTeam = new TeamModel({  
                TeamName: teamData.TeamName,  
                Description: teamData.Description,  
                TeamLead: teamData.TeamLead,  
                memberIds: teamData.memberIds,  
                createdBy: teamData.createdBy  
            });  

      
            const savedTeam = await this.teamRepository.createTeam(newTeam);  
            
            return BaseResponseDto.success(savedTeam, 'Team created successfully.');  
        } catch (error) {  
            console.error('Error in CreateTeamUseCase:', error);  
            return BaseResponseDto.serverError('An error occurred while creating the team.');  
        }  
    }  
}