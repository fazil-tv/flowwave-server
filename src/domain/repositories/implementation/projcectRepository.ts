import { IProject, ProjectStatus } from '../../../application/interfaces/project.interface'
import { ProjectModel } from "../../../infrastructure/database";
import { IPublicProject } from '../../../application/interfaces/';
import { Types } from 'mongoose';
import { IProjectBasic } from '../../../application/interfaces/project.basic.interfaces';

export class ProjectRepository {

    async create(projectData: IProject): Promise<IProject> {
        try {

            const project = new ProjectModel({
                ...projectData,
                status: ProjectStatus.NOT_STARTED,
                progress: 0,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const savedProject = await project.save();

            return savedProject.toObject();
        } catch (error) {
            throw new Error(`Error creating project: ${error}`);
        }
    }


    async findByName(projectName: string, userId: string): Promise<IProject | null> {
        try {
            const userObjectId = new Types.ObjectId(userId);
            const project = await ProjectModel.findOne({
                projectName,
                userId: userObjectId,
                isDeleted: false
            });
            return project ? project.toObject() : null;
        } catch (error) {
            throw new Error(`Error finding project by name: ${error}`);
        }
    }

    async saveProject(project: IProject): Promise<IProject> {
        try {
            const newProject = new ProjectModel(project);
            const savedProject = await newProject.save();
            return savedProject.toObject();
        } catch (error) {
            console.error('Error saving project:', error);
            throw new Error('Failed to save project');
        }
    }



    async getAllProjects(): Promise<IProject[]> {
        try {
            const projects = await ProjectModel.find({ isDeleted: false })
                .populate('serviceId')
                .populate('userId');

            return projects.map(project => project.toObject());
        } catch (error) {
            console.error('Error getting all projects:', error);
            throw new Error('Failed to get projects');
        }
    }

    async getProjectsByUserId(userId: string): Promise<IPublicProject[]> {
        try {
            const projects = await ProjectModel.find(
                { userId, isDeleted: false },
                {
                    _id: 1,
                    projectName: 1,
                    description: 1,
                    ProjectLead: 1,
                    projectCode: 1,
                    startDate: 1,
                    endDate: 1,
                    status: 1,
                    tags: 1,
                    completedAt: 1,
                    progress: 1
                }
            )
                .sort({ createdAt: -1 })
                .populate('ProjectLead', 'username')
                .lean();

            return projects as unknown as IPublicProject[];
        } catch (error) {
            console.error('Error getting public projects:', error);
            throw new Error('Failed to get public projects');
        }
    }

    async findProjectById(id: string): Promise<IPublicProject[]> {
        try {
            const project = await ProjectModel.findById(
                id,
                {
                    _id: 1,
                    projectName: 1,
                    description: 1,
                    ProjectLead: 1,
                    projectCode: 1,
                    status: 1,
                    tags: 1,
                    startDate: 1,
                    priority: 1,
                    endDate: 1,
                    progress: 1,
                }
            )
                .populate('ProjectLead', 'username')
                .lean();

            return project ? [project as unknown as IPublicProject] : [];
        } catch (error) {
            console.error('Error finding project by ID:', error);
            throw new Error('Failed to find project');
        }
    }

    async updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
        try {
            const updatedProject = await ProjectModel.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true }
            )

            return updatedProject ? updatedProject.toObject() as IProject : null;
        } catch (error) {
            console.error('Error updating project:', error);
            throw new Error('Failed to update project: ' + error);
        }
    }


    async addTaskToProject(projectId: string, taskId: string): Promise<void> {
        await ProjectModel.findByIdAndUpdate(
            projectId,
            { $addToSet: { tasks: taskId } },
            { new: true }
        ).exec();
    }


    async findProjectByIdWithTasks(projectId: string): Promise<IProjectBasic | null> {  
        const project = await ProjectModel.findById(projectId)  
            .select('projectName _id tasks')  
            // .populate({  
            //     path: 'tasks',  
            // })  
            .populate({  
                path: 'tasks',  
                populate: {
                    path: 'assignee',
                    select: 'username email' 
                }  
            })
            .exec();  
    
        if (!project) {  
            return null; 
        }  
     
        return {  
            projectName: project.projectName, 
            _id: project._id.toString(), 
            tasks: project.tasks || [], 
        } as IProjectBasic;  
    }


    // async softDeleteProject(id: string): Promise<boolean> {
    //     try {
    //         const result = await ProjectModel.findByIdAndUpdate(
    //             id,
    //             { $set: { isDeleted: true } }
    //         );
    //         return !!result;
    //     } catch (error) {
    //         console.error('Error deleting project:', error);
    //         throw new Error('Failed to delete project');
    //     }
    // }

}
