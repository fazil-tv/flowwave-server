import { Service } from "../../entities/serviceEntity";
import { IServiceRepository } from "../../repositories/interface/serviceinterface";

export class GetServiceByIdUseCase {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(id: string): Promise<Service | null> {

   
    if (!id) {
      throw new Error("Service ID is required.");
    }

    console.log("{use case hited}")

    const service = await this.serviceRepository.getServiceById(id);

    console.log("services ",service)

    if (!service) {
      throw new Error("Service not found.");
    }

    return service;
  }
}
