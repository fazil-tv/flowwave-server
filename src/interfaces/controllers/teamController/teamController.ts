import { Request, Response } from "express";
import { BaseResponseDto } from "../../../application/dtos/common/BaseResponseDto";
import { CreateTeamUseCase } from "../../../application/usecases/team/create-team-usecases";
import { GetTeamsByCreatorUseCase } from "../../../application/usecases/team/getteam-bycreator-usecases";
import { UpdateTeamUseCase } from '../../../application/usecases/team/update-team-usecases';

export class TeamController {
    constructor(
        private createTeamUseCase: CreateTeamUseCase,
        private getTeamsByCreatorUseCase: GetTeamsByCreatorUseCase,
        private updateTeamUseCase: UpdateTeamUseCase,



    ) { }

    public async createTeam(req: any, res: Response): Promise<void> {
        try {
            const { TeamName, TeamLead, Members, Description } = req.body;

            if (!TeamName) {
                const response = BaseResponseDto.badRequest('Team name is required');
                res.status(response.statusCode).json(response);
                return;
            }

            const user = req.user;
            if (!user) {
                const response = BaseResponseDto.unauthorized('Unauthorized: No user found.');
                res.status(response.statusCode).json(response);
                return;
            }

            const teamData = {
                TeamName,
                Description,
                TeamLead,
                memberIds: Members || [],
                createdBy: user.id
            };

            const result = await this.createTeamUseCase.execute(teamData);

            if (!result.success) {
                const message = result.message || 'An error occurred while creating the team';
                const response = BaseResponseDto.badRequest(message);
                res.status(response.statusCode).json(response);
                return;
            }


            const response = BaseResponseDto.success(result, 'Team created successfully');
            res.status(response.statusCode).json(response);

        } catch (error) {
            console.error('Create Team Error:', error);
            const response = BaseResponseDto.serverError('An error occurred while creating the team');
            res.status(response.statusCode).json(response);
        }
    }

    public async getTeamsByCreator(req: Request, res: Response): Promise<void> {

        const userId = req.params.userId;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return
        }

        try {
            const result = await this.getTeamsByCreatorUseCase.execute(userId);

            if (result.success) {
                res.status(200).json(result);
                return
            }

            res.status(result.statusCode).json(result);
            return
        } catch (error) {
            console.error('Get Teams by Creator Error:', error);


            const response = BaseResponseDto.serverError('An error occurred while retrieving teams.');
            res.status(response.statusCode).json(response);
        }
    }



    public async updateTeam(req: any, res: Response): Promise<void> {
        try {
            const { TeamName, TeamLead, Members, Description ,id} = req.body;


            if (!TeamName) {
                const response = BaseResponseDto.badRequest('Team name is required');
                res.status(response.statusCode).json(response);
                return;
            }

            const user = req.user;
           


            if (!user) {
                const response = BaseResponseDto.unauthorized('Unauthorized: No user found.');
                res.status(response.statusCode).json(response);
                return;
            }


            const memberIds = Members.map((member: any) => member._id);
         
            

            const teamData = {
                TeamName,
                Description,
                TeamLead,
                memberIds
            };

        
            const result = await this.updateTeamUseCase.execute(id, teamData);

            if (!result.success) {
                const message = result.message || 'An error occurred while updating the team';
                const response = BaseResponseDto.badRequest(message);
                res.status(response.statusCode).json(response);
                return;
            }

            const response = BaseResponseDto.success(result.data, 'Team updated successfully');
            res.status(response.statusCode).json(response);

        } catch (error) {
            console.error('Update Team Error:', error);
            const response = BaseResponseDto.serverError('An error occurred while updating the team');
            res.status(response.statusCode).json(response);
        }
    }





}