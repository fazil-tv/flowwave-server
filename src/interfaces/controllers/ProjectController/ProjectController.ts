import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



import { InitiateProjectUseCase } from '../../../application/usecases/user';
import { GetProjectsUseCase } from '../../../application/usecases/projects/getprojectusecase';
import { GetUserProjectsUseCase } from '../../../application/usecases/projects';
import { GetProjectByIdUseCase } from '../../../application/usecases/projects/GetProjectByIdUseCase';

import { ProjectStatus, ProjectPriority } from '../../../application/interfaces/project.interface';

export class ProjectController {


    constructor(

        private initiateProjectUseCase: InitiateProjectUseCase,
        private getProjectsUseCase: GetProjectsUseCase,
        private getUserProjectsUseCase: GetUserProjectsUseCase,
        private getProjectByIdUseCase: GetProjectByIdUseCase

    ) { }




    public async createProject(req: Request, res: Response): Promise<void> {
        try {

          

            const token = req.cookies.token;
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: 'No authentication token provided',
                });
                return;
            }

            const secretKey = process.env.JWT_SECRET || 'muhammed';
            const decoded: any = jwt.verify(token, secretKey);
            const userId = decoded.id;

    
            const projectData = await this.validateAndFormatProjectData(req.body, userId);
            console.log(projectData)
            
            const newProject = await this.initiateProjectUseCase.execute(projectData);

            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: newProject
            });

        } catch (error: any) {

            console.error('Error creating project:', error.message);
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Failed to create project',
            });

        }
    }

    private async validateAndFormatProjectData(body: any, userId: string) {
        const {
            ProjectName,
            Description,
            ProjectLead,
            Priority = ProjectPriority.MEDIUM,
            StartDate,
            EndDate,
            tags = [],
            team = [],
        } = body;

        console.log(body,"body")


        if (!ProjectName || !Description || !StartDate || !EndDate || !ProjectLead) {
            throw { status: 400, message: 'Missing required fields' };
        }

     
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        if (end <= start) {
            throw { status: 400, message: 'End date must be after start date' };
        }

       
        const projectCode = `PRJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        return {
            projectName: ProjectName, 
            projectCode,
            ProjectLead,
            userId,
            description: Description, 
            status: ProjectStatus.NOT_STARTED,
            priority: Priority, 
            startDate: start,
            endDate: end,
            progress: 0,
            tasks: [], 
            team, 
            attachments: [],
            tags,
            isDeleted: false,
        };
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