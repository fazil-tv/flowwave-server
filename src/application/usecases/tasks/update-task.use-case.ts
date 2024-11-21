import { ITaskRepository } from '../../../domain/repositories';
import {  UpdateTaskDTO } from '../../dtos/user/TaskDTO';
import { ITask } from "../../../application/interfaces/task.interface";


export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(
      taskId: string, 
      updateData: UpdateTaskDTO
    ): Promise<ITask | null> {
      // Optional: Add validation logic
      const updatedTask = await this.taskRepository.update(
        taskId, 
        updateData
      );
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask;
    }
  }