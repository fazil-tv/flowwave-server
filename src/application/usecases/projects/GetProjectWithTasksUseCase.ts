import { IProjectRepository } from "../../../domain/repositories";  
import { BaseResponseDto } from "../../dtos/common/BaseResponseDto";  
import { IProjectBasic } from '../../../application/interfaces/project.basic.interfaces';

export class GetProjectWithTasksUseCase {  
    constructor(private readonly projectRepository: IProjectRepository) {}  

    async execute(projectId: string): Promise<BaseResponseDto<IProjectBasic | null>> {  
        try {  
            const project = await this.projectRepository.findProjectByIdWithTasks(projectId);  

            if (!project) {  
                return BaseResponseDto.error(`Project with ID ${projectId} not found.`);  
            }  

            return BaseResponseDto.success(project, 'Project retrieved successfully');  
        } catch (error) {  
            console.error("Error while retrieving the project:", error);  
            return BaseResponseDto.error('An error occurred while retrieving the project');  
        }  
    }  
}