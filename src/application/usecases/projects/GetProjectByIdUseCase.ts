import { ProjectRepository } from "../../../domain/repositories";
import { Project } from '../../../domain/entities'; 

export class GetProjectByIdUseCase {
    private projectRepository: ProjectRepository;

    constructor(projectRepository: ProjectRepository) {
        this.projectRepository = projectRepository;
    }

    public async execute(id: string): Promise<Project | null> {
        try {
            const project = await this.projectRepository.findProjectById(id);
            return project; 
        } catch (error) {
            console.error('Error in GetProjectByIdUseCase:', error);
            throw new Error('Failed to fetch project');
        }
    }
}
