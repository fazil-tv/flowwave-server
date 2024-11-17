import mongoose, { Schema } from 'mongoose';
import { IProject, ProjectStatus, ProjectPriority } from '../../../../application/interfaces/project.interface';

const projectSchema = new Schema<IProject>({
  projectName: { type: String, required: true },
  ProjectLead:{type:String,required:true},
  projectCode: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(ProjectStatus),
    default: ProjectStatus.NOT_STARTED 
  },
  priority: { 
    type: String, 
    enum: Object.values(ProjectPriority),
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  completedAt: { type: Date },
  progress: { type: Number, default: 0 },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  team: [{ type: Schema.Types.ObjectId, ref: 'TeamMember' }],
  attachments: [{ type: String }],
  tags: [{ type: String }],
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});



projectSchema.index({ userId: 1, isDeleted: 1 });
projectSchema.index({ projectCode: 1 }, { unique: true });
projectSchema.index({ status: 1 });

export const ProjectModel = mongoose.model<IProject>('Project', projectSchema);