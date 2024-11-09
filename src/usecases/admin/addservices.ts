import { Service } from '../../entities/serviceEntity';
import { IServiceRepository } from '../../repositories/interface/serviceinterface';

export class AddServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(service: Service): Promise<void> {
    await this.serviceRepository.addService(service);
  }
}

