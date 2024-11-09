import mongoose, { Schema, Document , ObjectId } from 'mongoose';


export interface IProjectDocument extends Document {
    _id: ObjectId;
    projectName: string;
    userId: mongoose.Types.ObjectId;
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
    phase: string;
    serviceId:mongoose.Types.ObjectId;
    assignedContractorId?: mongoose.Types.ObjectId;
    reports?: {
        reportDate: Date;
        reportDetails: string;
        reportFile: string;
        reportStatus: string;
        reportType: string;
    }[];
    contractorId?: mongoose.Types.ObjectId;
    documents?: Date;
}


const ProjectSchema: Schema = new Schema(
    {
        projectName: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        projectDescription: { type: String},
        totalBudget: { type: Number, required: false },
        location: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zip: { type: String, required: true }
        },
        startDate: { type: Date },
        status: { type: String, required: true, default: 'initiated' },
        endDate: { type: Date },
        phase: { type: String, required: true, default: 'initiation' },
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        assignedContractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor'},
        reports: [
            {
                reportDate: { type: Date, required: true },
                reportDetails: { type: String, required: true },
                reportFile: { type: String, required: true },
                reportStatus: { type: String, required: true },
                reportType: { type: String, required: true }
            }
        ],
        contractorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' },
        documents: { type: Date},
    },
    {
        timestamps: true, 
    }
);


export const ProjectModel = mongoose.model<IProjectDocument>('Project', ProjectSchema);
