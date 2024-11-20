import { IProject } from '../../../application/interfaces/project.interface';
import { IProjectRepository } from '../../../domain/repositories';
import { IUserRepository } from '../../../domain/repositories';

export class InitiateProjectUseCase {

    constructor(
        private projectRepository: IProjectRepository,
        private userRepository: IUserRepository
    ) { }

    async execute(projectData: IProject): Promise<IProject> {

        try {
         
            const existingProject = await this.projectRepository.findByName(projectData.projectName);
            if (existingProject) {
                throw new Error('Project name already exists');
            }

            const newProject = await this.projectRepository.create(projectData);
            return newProject;

        } catch (error: any) {
            throw new Error(error.message);
        }

    }

    }
