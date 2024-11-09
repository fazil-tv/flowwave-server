import { IProjectRepository } from "../../repositories";
import { Project } from "../../entities";

export class GetProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }
}
