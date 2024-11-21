import mongoose, { Schema, Document } from "mongoose";
import { IUserData } from "./userModel";
import { ProjectPriority } from "../../../../application/interfaces/project.interface";


export enum TaskStatus {
  TO_DO = "TO_DO",
  ON_PROGRESS = "ON_PROGRESS",
  COMPLETED = "COMPLETED",
}


const UserDataSchema = new Schema<IUserData>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});


const TaskSchema = new Schema({
taskCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  projectId: { type: mongoose.Types.ObjectId, ref: "Project", required: true }, 
  progress: { type: Number, default: 0 },
  priority: { 
    type: String, 
    enum: Object.values(ProjectPriority),
    required: true 
  },
  status: { 
    type: String, 
    enum: Object.values(TaskStatus), 
    default: TaskStatus.TO_DO, 
    required: true 
  },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  module: { type: String },
  isDeleted: { type: Boolean, default: false },
  assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});


export const Task = mongoose.model("Task", TaskSchema);
