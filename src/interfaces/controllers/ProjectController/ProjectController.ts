import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();



import { InitiateProjectUseCase } from '../../../application/usecases/user';
import { GetProjectsUseCase } from '../../../application/usecases/projects/getprojectusecase';
import { GetUserProjectsUseCase } from '../../../application/usecases/projects';
import { GetProjectByIdUseCase } from '../../../application/usecases/projects/GetProjectByIdUseCase';
import { UpdateProjectUseCase } from '../../../application/usecases/projects/UpdateprojectUsecase';
import { ProjectStatus, ProjectPriority } from '../../../application/interfaces/project.interface';
import { BaseResponseDto } from '../../../application/dtos/common/BaseResponseDto';

export class ProjectController {


    constructor(

        private initiateProjectUseCase: InitiateProjectUseCase,
        private getProjectsUseCase: GetProjectsUseCase,
        private getUserProjectsUseCase: GetUserProjectsUseCase,
        private getProjectByIdUseCase: GetProjectByIdUseCase,
        private updateProjectUseCase: UpdateProjectUseCase


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

        console.log(body, "body")


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
            userId: new ObjectId(userId),
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
                const response = BaseResponseDto.notFound('No projects found');
                res.json(response);
                return;
            }
            const response = BaseResponseDto.success(project);
            res.json(response);

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch project',
            });
        }
    }


    public async getUserProjects(req: any, res: Response): Promise<void> {
        try {
            const user = req.user;

            console.log(user.id)

            if (!user) {
                const response = BaseResponseDto.notFound('Unauthorized: No user found.');
                res.json(response);
                return;
            }

            const projects = await this.getUserProjectsUseCase.execute(user.id);

            if (!projects || projects.length === 0) {

                const response = BaseResponseDto.notFound('No projects found for this user');
                res.json(response);
                return;
            }

            const response = BaseResponseDto.success(projects);
            res.json(response);

        } catch (error) {
            const response = BaseResponseDto.error('An error occurred while fetching user projects');
            res.json(response);
        }
    }


    public async updateProject(req: any, res: Response): Promise<void> {
        try {
            const user = req.user;
            const projectId = req.params.id;
            const updateData = req.body;

            if (!user) {
                const response = BaseResponseDto.unauthorized('Unauthorized: No user found.');
                res.status(response.statusCode).json(response);
                return;
            }

            const result = await this.updateProjectUseCase.execute(
                projectId,
                updateData
            );

            if (!result.success) {
                let statusCode = 400;
                if (result.message.includes('not found')) {
                    statusCode = 404;
                }
                res.status(statusCode).json(result);
                return;
            }

    
            res.status(result.statusCode).json(result);

        } catch (error) {
            console.error('Update Project Error:', error);
            const response = BaseResponseDto.serverError('An error occurred while updating the project');
            res.status(response.statusCode).json(response);
        }
    }
}




