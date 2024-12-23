import { ITaskRepository } from '../../../domain/repositories';
import { CreateTaskDTO } from '../../dtos/user/TaskDTO';
import { ITask } from "../../../application/interfaces/task.interface";
import { IProjectRepository } from '../../../domain/repositories';
import { ProjectProgressService } from '../../../infrastructure/services/common/ProjectProgressServices';

import { UpdateProjectUseCase } from '../projects';

interface CreateTaskResponse {  
    success: boolean;  
    task?: ITask; 
    message?: string;  
}  

export class CreateTaskUseCase {
    private progressService: ProjectProgressService;
    
    constructor(
        private taskRepository: ITaskRepository,
        private projectRepository: IProjectRepository,
        private readonly updateProjectUseCase: UpdateProjectUseCase
    ) { 
        this.progressService = ProjectProgressService.getInstance(
            taskRepository,
            projectRepository,
            updateProjectUseCase
          );
    }

    async execute(
        taskData: CreateTaskDTO,
        projectId: string
    ): Promise<CreateTaskResponse> {


        const project = await this.projectRepository.findProjectById(projectId);
        if (!project) {  
            return { success: false, message: 'Project not found' };
        }  
        const existingTask = await this.taskRepository.findTaskByNameInProject(
            taskData.name,
            projectId
        );


        if (existingTask) {
            return { success: false, message: 'A task with this name already exists in the project' };
        }

       
        const taskCode = `TASK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;


        const task = await this.taskRepository.create(
            { ...taskData },
            projectId,
            taskCode 
        );

        await this.progressService.updateProjectProgress(projectId);

        return { success: true, task, message: 'Task created successfully' };
    }
}