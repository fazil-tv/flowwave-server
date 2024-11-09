import { IProjectRepository } from "../../../domain/repositories";
import { Project } from "../../../domain/entities";

export class GetProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.getAllProjects();
  }
}
