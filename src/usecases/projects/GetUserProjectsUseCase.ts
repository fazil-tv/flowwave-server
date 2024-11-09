

import { IProjectRepository } from "../../repositories";
import { Project } from '../../entities';

export class GetUserProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId: string): Promise<Project[]> {
    return await this.projectRepository.getProjectsByUserId(userId);
  }
}
