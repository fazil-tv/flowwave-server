import { Service } from '../../../domain/entities/serviceEntity';
import { IServiceRepository } from '../../../domain/repositories/interface/serviceinterface';

export class EditServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) { }

  async execute(id: string, updatedService: Partial<Service>): Promise<Service | null> {
    console.log("updatedService", updatedService)
    return this.serviceRepository.editService(id, updatedService);
  }
}
