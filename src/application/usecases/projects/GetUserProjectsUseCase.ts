

import { IProjectRepository } from "../../../domain/repositories";
import { Project } from '../../../domain/entities';

export class GetUserProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId: string): Promise<Project[]> {
    return await this.projectRepository.getProjectsByUserId(userId);
  }
}
