import { IProjectRepository } from "../../../domain/repositories";

import { IPublicProject } from "../../interfaces";

export class GetProjectByIdUseCase {
    constructor(private projectRepository: IProjectRepository) {}

   
    public async execute(id: string): Promise<IPublicProject[]> {
          return await this.projectRepository.findProjectById(id);
    }
}
