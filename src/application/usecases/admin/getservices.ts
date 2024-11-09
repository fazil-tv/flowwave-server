import { Service } from '../../../domain/entities/serviceEntity';
import { IServiceRepository } from '../../../domain/repositories/interface/serviceinterface';

export class GetAllServicesUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.getAllServices();
  }
}
