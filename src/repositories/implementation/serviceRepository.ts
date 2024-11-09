import { IServiceRepository } from '../interface/serviceinterface';
import { Service } from '../../entities/serviceEntity';
import { ServiceModel } from '../../infrastructure/db/models/serviceModel';

export class ServiceRepositoryImpl implements IServiceRepository {
  async addService(service: Service): Promise<void> {
    const serviceDocument = new ServiceModel(service);
    await serviceDocument.save();
  }

  async getAllServices(): Promise<Service[]> {
    return ServiceModel.find().exec();
  }

  async getServiceById(id: string): Promise<Service | null> {
    return ServiceModel.findById(id).exec(); 
  }

  async editService(id: string, updatedService: Partial<Service>): Promise<Service | null> {
    return ServiceModel.findByIdAndUpdate(id, updatedService, { new: true }).exec();
  }


  async deleteService(id: string): Promise<boolean | null> {
    const result = await ServiceModel.findByIdAndDelete(id).exec();
  return result ? true : null; 
  }




  
}
