import { ITaskRepository } from '../../../domain/repositories';
import { CreateTaskDTO } from '../../dtos/user/TaskDTO';
import { ITask } from "../../../application/interfaces/task.interface";


export class GetProjectTasksUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(projectId: string): Promise<ITask[]> {
      return this.taskRepository.findByProject(projectId);
    }
  }