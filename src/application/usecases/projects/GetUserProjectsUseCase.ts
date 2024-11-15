

import { IProjectRepository } from "../../../domain/repositories";
// import { Project } from '../../../domain/entities';
import {IProject} from '../../../application/interfaces/project.interface'

export class GetUserProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId: string): Promise<IProject[]> {
    return await this.projectRepository.getProjectsByUserId(userId);
  }
}
