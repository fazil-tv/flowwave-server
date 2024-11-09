import { Service } from "../../entities/serviceEntity";

export interface IServiceRepository {
  addService(service: Service): Promise<void>;
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | null>;
  editService(id: string, updatedService: Partial<Service>): Promise<Service | null>;
  deleteService(id: string): Promise<boolean |null>;

}
