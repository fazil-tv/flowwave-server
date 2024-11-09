import { Service } from '../../entities/serviceEntity';
import { IServiceRepository } from '../../repositories/interface/serviceinterface';

export class GetAllServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.getAllServices();
  }
}
