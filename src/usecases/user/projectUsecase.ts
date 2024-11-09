import mongoose from 'mongoose';

import { IProjectRepository } from '../../repositories';
import { IUserRepository } from '../../repositories';
import { Project } from '../../entities';


interface InitiateProjectDTO {
    userId: string;
    serviceId: string;
    projectData: {
        projectName: string;
        projectDescription: string;
        location: {
            street: string;
            city: string;
            state: string;
            country: string;
            zip: string;
        };
    };
}

export class InitiateProjectUseCase {

    constructor(
        private projectRepository: IProjectRepository,
        private userRepository: IUserRepository 
    ) {}
    
    async execute({ userId, serviceId, projectData }: InitiateProjectDTO) {

        const { Street, City, state, Country, Zip, ProjectName , Description } = projectData  as any;
        if (!Street || !City || !state || !Country || !Zip) {
            throw new Error("All location fields are required: street, city, state, country, zip.");
        }

        const location = {
            street: Street,
            city: City,
            state: state,
            country: Country,
            zip: Zip
        };


    
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        
        const project = new Project({
            projectName: ProjectName,
            userId: new mongoose.Types.ObjectId(userId),
            projectDescription: Description,
            location: location,
            status: 'initiated',
            phase: 'initiation',
            serviceId:  new mongoose.Types.ObjectId(serviceId),
        });

       
        await this.projectRepository.saveProject(project);

        return project;
    }
}
