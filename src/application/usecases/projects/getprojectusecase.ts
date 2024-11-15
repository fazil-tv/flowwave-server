import { IProjectRepository } from "../../../domain/repositories";
import {IProject} from '../../../application/interfaces/project.interface'

export class GetProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<IProject[]> {
    return this.projectRepository.getAllProjects();
  }
}
