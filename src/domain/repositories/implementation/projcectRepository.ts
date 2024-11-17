import {IProject,ProjectStatus} from '../../../application/interfaces/project.interface'
import { ProjectModel } from "../../../infrastructure/database";




export class ProjectRepository {

    async create(projectData: IProject): Promise<IProject> {
        try {
            console.log(projectData,"++++++++++++++++++++++")
            const project = new ProjectModel({
                ...projectData,
                status: ProjectStatus.NOT_STARTED,
                progress: 0,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            const savedProject = await project.save();

            console.log(savedProject,"_-----------------")
            return savedProject.toObject();
        } catch (error) {
            throw new Error(`Error creating project: ${error}`);
        }
    }

    async findByName(projectName: string): Promise<IProject | null> {
        try {
            const project = await ProjectModel.findOne({ 
                projectName, 
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

    async findProjectById(id: string): Promise<IProject | null> {
        try {
            const project = await ProjectModel.findById(id)
                .populate('serviceId')
                .populate('userId');

            return project ? project.toObject() : null;
        } catch (error) {
            console.error('Error finding project by ID:', error);
            throw new Error('Failed to find project');
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

    async getProjectsByUserId(userId: string): Promise<IProject[]> {
        try {
            const projects = await ProjectModel.find({ 
                userId: userId,
                isDeleted: false 
            })
            .populate('serviceId')
            .populate('userId');

            return projects.map(project => project.toObject());
        } catch (error) {
            console.error('Error getting projects by user ID:', error);
            throw new Error('Failed to get user projects');
        }
    }

    // async updateProject(id: string, updateData: Partial<IProject>): Promise<IProject | null> {
    //     try {
    //         const updatedProject = await ProjectModel.findByIdAndUpdate(
    //             id,
    //             { $set: updateData },
    //             { new: true }
    //         )
    //         .populate('serviceId')
    //         .populate('userId');

    //         return updatedProject ? updatedProject.toObject() : null;
    //     } catch (error) {
    //         console.error('Error updating project:', error);
    //         throw new Error('Failed to update project');
    //     }
    // }

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
 