import { IProjectRepository, ITaskRepository } from '../../../domain/repositories';
import { UpdateTaskDTO } from '../../dtos/user/TaskDTO';
import { ITask } from "../../../application/interfaces/task.interface";
import { BaseResponseDto } from '../../dtos/common/BaseResponseDto';
import { UpdateProjectUseCase } from '../projects';
import { ProjectProgressService } from '../../../infrastructure/services/common/ProjectProgressServices';

export class UpdateTaskUseCase {

  private progressService: ProjectProgressService;

  constructor(
    private taskRepository: ITaskRepository,
    private readonly projectRepository: IProjectRepository,
    private readonly updateProjectUseCase: UpdateProjectUseCase
  ) {
    this.progressService = ProjectProgressService.getInstance(
      taskRepository,
      projectRepository,
      updateProjectUseCase
    );
  }

  async execute(
    taskId: string,
    projectId: string,
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

    if (updateData.progress !== undefined && updateData.progress !== existingTask.progress) {
      await this.progressService.updateProjectProgress(projectId);
  }





    return BaseResponseDto.success(updatedTask, 'Task updated successfully');
  }
}