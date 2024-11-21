

  import { ITaskRepository } from '../../../domain/repositories';


export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}
  
    async execute(taskId: string): Promise<boolean> {
   
      return this.taskRepository.softDelete(taskId);
    }
  }
