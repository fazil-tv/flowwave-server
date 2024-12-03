import { TeamModel } from '../../../infrastructure/database/mongoose/models/teamModel';
import { ITeam } from '../../../application/interfaces/team.interfaces';
import { ITeamRepository } from '../interface/teaminterface';

export class TeamRepository implements ITeamRepository {



    async createTeam(teamData: ITeam): Promise<ITeam> {
        const newTeam = new TeamModel(teamData);
        return await newTeam.save();
    }

    public async getTeamsByCreator(createdBy: string): Promise<ITeam[]> {  
        return await TeamModel.find({ createdBy }) .populate('TeamLead').populate('memberIds').exec();
    }  


    async getAllTeams(): Promise<ITeam[]> {
        return await TeamModel.find().exec();
    }


    async getTeamById(teamId: string): Promise<ITeam | null> {
        return await TeamModel.findById(teamId).exec();
    }

    public async updateTeam(teamId: string, teamData: any): Promise<any> {
        try {
            const updatedTeam = await TeamModel.findByIdAndUpdate(
                teamId,
                {
                    ...teamData,
                    updatedAt: new Date() 
                },
                { new: true } 
            );
            return updatedTeam;
        } catch (error) {
            console.error('Error in TeamRepository while updating team:', error);
            throw new Error('Database error');
        }
    }

    async deleteTeam(teamId: string): Promise<ITeam | null> {
        return await TeamModel.findByIdAndDelete(teamId).exec();
    }


    async findByName(teamName: string): Promise<ITeam | null> {
        return await TeamModel.findOne({ TeamName: teamName }).exec();
    }

}

