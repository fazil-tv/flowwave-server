import { ITaskRepository } from '../../../domain/repositories';
import {  UpdateTaskDTO } from '../../dtos/user/TaskDTO';
import { ITask } from "../../../application/interfaces/task.interface";
import { BaseResponseDto } from '../../dtos/common/BaseResponseDto';

export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(
      taskId: string, 
      projectId:string,
      updateData: UpdateTaskDTO
    ): Promise<BaseResponseDto<ITask> | null> {
    
      const existingTask = await this.taskRepository.findById(taskId);
      
      
      if (!existingTask) {
        return BaseResponseDto.error('Task not found');
        
      }


      if (existingTask && updateData.name && updateData.name !== existingTask.name) {  
        const existingTaskByName = await this.taskRepository.findByName(updateData.name, projectId);  
        if (existingTaskByName) {  
          return BaseResponseDto.error(`Task name '${updateData.name}' already exists in this project.`);
        }  
      }
      
      const updatedTask = await this.taskRepository.update(
        taskId, 
        updateData
      );
  
      if (!updatedTask) {
      
        return BaseResponseDto.error(`Failed to update Task with ID ${taskId}.`);
      }
  
      return BaseResponseDto.success(updatedTask, 'Task updated successfully');
    }
  }