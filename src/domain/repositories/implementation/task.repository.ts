import { Types } from 'mongoose';

import { Task } from '../../../infrastructure/database/mongoose/models/taskModel';
import { ITask } from "../../../application/interfaces/task.interface";
import { CreateTaskDTO, UpdateTaskDTO } from '../../../application/dtos/user/TaskDTO';


import { ITaskRepository } from '../interface/task.interface'


export class TaskRepository implements ITaskRepository {

  async create(taskData: CreateTaskDTO, projectId: string,taskCode:string): Promise<ITask> {
    try {
      const task = new Task({
        ...taskData,
        projectId: new Types.ObjectId(projectId),
        taskCode

      });

      const savedTask = await task.save() as unknown as ITask;
      return savedTask;
    } catch (error) {
      throw new Error(`Error creating task: ${error}`);
    }
  }

  async findTaskByNameInProject(taskName: string, projectId: string): Promise<ITask | null> {  
    try {  
      const task = await Task.findOne({   
        name: {
          $regex: new RegExp(`^${this.escapeRegex(taskName)}$`, 'i')  
        },  
        projectId: projectId,  
        isDeleted: false  
      });  
  
      return task ? task.toObject() : null; 
    } catch (error) {  
      console.error('Error finding task by name:', error);  
      throw new Error(`Error finding task by name in project: ${error instanceof Error ? error.message : error}`);  
    }  
  }  
  
  private escapeRegex(text: string): string {  
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');  
  }



  async findById(id: string): Promise<ITask | null> {
    try {
      return await Task.findById(id).lean();
    } catch (error) {
      throw new Error(`Error finding task: ${error}`);
    }
  }

  async findByProject(projectId: string): Promise<ITask[]> {
    try {
      return await Task.find({
        projectId: new Types.ObjectId(projectId),
        deletedAt: null
      }).lean();
    } catch (error) {
      throw new Error(`Error finding tasks by project: ${error}`);
    }
  }

  async update(
    id: string,
    data: UpdateTaskDTO
  ): Promise<ITask | null> {
    try {
      return await Task.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
    } catch (error) {
      throw new Error(`Error updating task: ${error}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await Task.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new Error(`Error deleting task: ${error}`);
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const result = await Task.findByIdAndUpdate(
        id,
        { deletedAt: new Date() }
      );
      return !!result;
    } catch (error) {
      throw new Error(`Error soft deleting task: ${error}`);
    }
  }
}