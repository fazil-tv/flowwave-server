import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



import { InitiateProjectUseCase } from '../../../usecases/user';
import { GetProjectsUseCase } from '../../../usecases/projects/getprojectusecase';
import { GetUserProjectsUseCase } from '../../../usecases/projects';
import { GetProjectByIdUseCase } from '../../../usecases/projects/GetProjectByIdUseCase';



export class ProjectController {


    constructor(

        private initiateProjectUseCase: InitiateProjectUseCase,
        private getProjectsUseCase: GetProjectsUseCase,
        private getUserProjectsUseCase: GetUserProjectsUseCase,
        private getProjectByIdUseCase: GetProjectByIdUseCase

    ) { }



    public async initiateProject(req: Request, res: Response): Promise<void> {

        try {

            const token = req.cookies.token;

            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'No authentication token provided',
                });
            }


            const secretKey = process.env.JWT_SECRET || 'muhammed';

            const decoded: any = jwt.verify(token, secretKey);

            const userId = decoded.id;



            const { serviceId, ...projectData } = req.body;

            console.log(serviceId, "serviceid")
            console.log(userId, "userId")

            const newProject = await this.initiateProjectUseCase.execute({ userId, serviceId, projectData });


            console.log(newProject)

            res.status(201).json({
                success: true,
                message: 'Project initiated successfully',
            });

        } catch (error) {

            console.error('Error initiating project:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to initiate project',
            });
        }

    }



    async getAllProjects(req: Request, res: Response) {
        try {

            const projects = await this.getProjectsUseCase.execute();


            res.status(200).json({
                success: true,
                projects,
                message: 'Projects fetched successfully',
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching the projects',
            });
        }
    }



    public async getProjectById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const project = await this.getProjectByIdUseCase.execute(id);
            if (!project) {
                res.status(404).json({
                    success: false,
                    message: 'Project not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                project,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch project',
            });
        }
    }


    public async getUserProjects(req: any, res: Response): Promise<void> {
        try {

            const user = req.user

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized: No user found.',
                });
                return;
            }
            console.log(user);

            const userId = user.id;
            console.log(`User ID: ${userId}`);

            const projects = await this.getUserProjectsUseCase.execute(userId);

            if (!projects.length) {
                res.status(404).json({
                    success: false,
                    message: 'No projects found for this user',
                });
                return;
            }

            res.status(200).json({
                success: true,
                projects
            });

        } catch (error) {
            console.error('Error fetching user projects:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch user projects',
            });
        }
    }


}