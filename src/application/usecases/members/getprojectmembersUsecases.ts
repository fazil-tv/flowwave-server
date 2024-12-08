import { Types } from "mongoose";
import { IProjectRepository } from "../../../domain/repositories";

export class GetProjectMembersUseCase {
  constructor(
    private projectRepository: IProjectRepository
  ) {}

  async execute(projectId: string | Types.ObjectId) {
    try {
      const projectObjectId = typeof projectId === 'string' 
        ? new Types.ObjectId(projectId) 
        : projectId;

      const projectWithMembers = await this.projectRepository.getProjectMembers(projectObjectId);
      if (!projectWithMembers) {
        throw new Error('Project not found');
      }
      return projectWithMembers;
    } catch (error) {
      if (error instanceof Error) {
        throw error; 
      }
      throw new Error('Failed to get project members');
    }
  }
}