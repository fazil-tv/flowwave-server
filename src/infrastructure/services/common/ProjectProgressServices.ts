import { ITaskRepository, IProjectRepository } from '../../../domain/repositories/interface';
import { UpdateProjectUseCase } from '../../../application/usecases';
import { ITask } from '../../../application/interfaces/task.interface';

export class ProjectProgressService {
    private static instance: ProjectProgressService;

    private constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly projectRepository: IProjectRepository,
        private readonly updateProjectUseCase: UpdateProjectUseCase
    ) {}

    public static getInstance(
        taskRepository: ITaskRepository,
        projectRepository: IProjectRepository,
        updateProjectUseCase: UpdateProjectUseCase
    ): ProjectProgressService {
        if (!ProjectProgressService.instance) {
            ProjectProgressService.instance = new ProjectProgressService(
                taskRepository,
                projectRepository,
                updateProjectUseCase
            );
        }
        return ProjectProgressService.instance;
    }

    public async updateProjectProgress(projectId: string, userId: string = 'system'): Promise<void> {
        try {
            const projectTasks = await this.taskRepository.findByProject(projectId);
            const progress = this.calculateProjectProgress(projectTasks);


            await this.updateProjectUseCase.execute(
                projectId,
                { progress },
                userId
            );
        } catch (error) {
            console.error('Error updating project progress:', error);
            throw new Error('Failed to update project progress');
        }
    }

    private calculateProjectProgress(tasks: ITask[]): number {
        if (!tasks || tasks.length === 0) {
            return 0;
        }

        const activeTasksCount = tasks.filter(task => !task.isDeleted).length;
        if (activeTasksCount === 0) {
            return 0;
        }

        const totalProgress = tasks.reduce((sum, task) => {
            if (task.isDeleted) {
                return sum;
            }
            return sum + (task.progress || 0);
        }, 0);

        return Math.round(totalProgress / activeTasksCount);
    }
}
