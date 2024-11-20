import { IProjectRepository } from "../../../domain/repositories";
import { BaseResponseDto } from "../../dtos/common/BaseResponseDto";
import { IProject } from "../../interfaces/project.interface";

export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(
    projectId: string,
    updateData: Partial<IProject>
  ): Promise<BaseResponseDto<IProject>> {
    try {
      const existingProjects = await this.projectRepository.findProjectById(projectId);

      if (!existingProjects || existingProjects.length === 0) {
        return BaseResponseDto.error(`Project with ID ${projectId} not found.`);
      }

      const currentProject = existingProjects[0];

      if (updateData.projectName && updateData.projectName !== currentProject.projectName) {
        const existingProject = await this.projectRepository.findByName(updateData.projectName);
        
        if (existingProject) {
          return BaseResponseDto.error(`Project name '${updateData.projectName}' already exists.`);
        }
      }

      const updatePayload: Partial<IProject> = {
        ...updateData,
        updatedAt: new Date(),
      };

      const updatedProject = await this.projectRepository.updateProject(projectId, updatePayload);

      if (!updatedProject) {
        return BaseResponseDto.error(`Failed to update project with ID ${projectId}.`);
      }

      return BaseResponseDto.success(updatedProject, 'Project updated successfully');
    } catch (error) {
      console.error("Error while updating the project:", error);
      return BaseResponseDto.error('An error occurred while updating the project');
    }
  }
}
