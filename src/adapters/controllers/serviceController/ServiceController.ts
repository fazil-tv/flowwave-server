import { Request, Response } from 'express';

import { ServiceRepositoryImpl } from '../../../repositories/implementation/serviceRepository';


import { GetAllServicesUseCase } from '../../../usecases/admin';
import { AddServiceUseCase } from '../../../usecases/admin';
import { EditServiceUseCase } from '../../../usecases/admin';
import { DeleteServiceUseCase } from '../../../usecases/admin';
import { GetServiceByIdUseCase } from '../../../usecases/services';




export class ServiceController {
  private serviceRepository: ServiceRepositoryImpl;
  private addServiceUseCase: AddServiceUseCase;
  private getAllServicesUseCase: GetAllServicesUseCase;
  private getServiceByIdUseCase: GetServiceByIdUseCase;



  private editServiceUseCase: EditServiceUseCase;
  private deleteServiceUseCase: DeleteServiceUseCase;


  constructor() {
    this.serviceRepository = new ServiceRepositoryImpl();
    this.addServiceUseCase = new AddServiceUseCase(this.serviceRepository);
    this.getAllServicesUseCase = new GetAllServicesUseCase(this.serviceRepository);
    this.getServiceByIdUseCase = new GetServiceByIdUseCase(this.serviceRepository);
    this.editServiceUseCase = new EditServiceUseCase(this.serviceRepository);
    this.deleteServiceUseCase = new DeleteServiceUseCase(this.serviceRepository);
  }



  public async addService(req: Request, res: Response): Promise<void> {
    try {
      const serviceData = req.body;

      const imageFiles = req.files as Express.Multer.File[] | undefined;

      const imagePaths = imageFiles ? imageFiles.map((file) => file.filename) : [];

      const serviceDataWithImages = {
        ...serviceData,
        images: imagePaths
      };

      await this.addServiceUseCase.execute(serviceDataWithImages);

      res.status(200).json({ success: true, message: 'Service added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to add service' });
    }
  } 

  public async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const services = await this.getAllServicesUseCase.execute();
      res.status(200).send(services);
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve services' });
    }
  }

  async getServiceById(req: Request, res: Response) {

    const { id } = req.params;
    try {

        const service = await this.getServiceByIdUseCase.execute(id);

        if (service) {
         
            res.status(200).json({success: true, service: service});
        } else {
            res.status(404).json({success: false , message: 'Service not found' });
        }

    } catch (error) {

        res.status(500).json({ message: 'Failed to retrieve service', error });

    }

}


  async editService(req: Request, res: Response) {
    const { id } = req.params;
    const serviceData = req.body;

    const imageFiles = req.files as Express.Multer.File[] | undefined;
    const imagePaths = imageFiles ? imageFiles.map((file) => file.filename) : [];

    try {

      const serviceDataWithImages = {
        ...serviceData,
        images: imagePaths
      };

      const result = await this.editServiceUseCase.execute(id, serviceDataWithImages);
      if (result) {
        res.status(200).json({ success: true, message: 'Service edit completed', service: result });
      } else {
        res.status(404).json({ success: false, message: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating service', error });
    }
  }


  async deleteService(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await this.deleteServiceUseCase.execute(id);
   
      if (result) {
        res.status(200).json({ success: true, message: 'Service deleted successfully' });
      } else {
        res.status(404).json({  success: false,message: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting service', error });
    }
  }
}
