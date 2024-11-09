import mongoose, { ObjectId } from 'mongoose';

export interface Report {
    reportDate: Date | null;
    reportDetails: string | null;
    reportFile: string | null;
    reportStatus: string | null;
    reportType: string | null;
}


export interface IProjectData {
    _id?:  mongoose.Types.ObjectId;
    projectName: string;
    userId:  mongoose.Types.ObjectId;  
    projectDescription: string;
    totalBudget?: number | null;
    location: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    startDate?: Date | null;
    status?: string; 
    endDate?: Date | null;
    phase?: string | null
    serviceId:  mongoose.Types.ObjectId;  
    assignedContractorId?:  mongoose.Types.ObjectId | null;
    reports?: Report[];
    contractorId?: ObjectId | null;
    documents?: Date | null;
}


export class Project {
    _id?:  mongoose.Types.ObjectId;
    projectName: string;
    userId:  mongoose.Types.ObjectId;  
    projectDescription: string;
    totalBudget: number | null;
    location: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    startDate: Date | null;
    status: string; 
    endDate: Date | null;
    phase: string | null; 
    serviceId:  mongoose.Types.ObjectId;  
    assignedContractorId:  mongoose.Types.ObjectId | null;
    reports: Report[];
    contractorId: ObjectId | null;
    documents: Date | null;

    constructor({
        _id,
        projectName,
        userId,
        projectDescription,
        totalBudget = null,
        location,
        startDate = null,
        status = 'Initiated',
        endDate = null,
        phase = null,
        serviceId,
        assignedContractorId = null,
        reports = [],
        contractorId = null,
        documents = null,
    }: IProjectData) {
        this._id = _id;
        this.projectName = projectName;
        this.userId = userId;
        this.projectDescription = projectDescription;
        this.totalBudget = totalBudget;
        this.location = location;
        this.startDate = startDate;
        this.status = status;
        this.endDate = endDate;
        this.phase = phase;
        this.serviceId = serviceId;
        this.assignedContractorId = assignedContractorId;
        this.reports = reports;
        this.contractorId = contractorId;
        this.documents = documents;
    }
}
