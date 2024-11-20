

import { IProjectRepository } from "../../../domain/repositories";
import { IPublicProject } from "../../interfaces";
export class GetUserProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId: string): Promise<IPublicProject[]> {
    return await this.projectRepository.getProjectsByUserId(userId);
  }
}
