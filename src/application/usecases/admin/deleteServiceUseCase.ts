import { IServiceRepository } from "../../../domain/repositories/interface/serviceinterface";

export class DeleteServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: string):Promise<boolean | null> {
    const result =  await this.serviceRepository.deleteService(id);
    return result ? true : null;
  }
}
