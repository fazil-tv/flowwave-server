import { Request, Response } from "express";
import { BaseResponseDto } from "../../../application/dtos/common/BaseResponseDto";
import { IPublicUserData } from "../../../application/interfaces";
import { CreateTaskUseCase } from "../../../application/usecases/tasks";
import { GetProjectTasksUseCase } from "../../../application/usecases/tasks";
import { DeleteTaskUseCase } from "../../../application/usecases/tasks";
import { UpdateProjectUseCase } from "../../../application/usecases";
export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private getProjectTasksUseCase: GetProjectTasksUseCase,
        private deleteTaskUseCase: DeleteTaskUseCase,
        private updateProjectUseCase: UpdateProjectUseCase,


    ) { }

    public async createTask(req: any, res: Response): Promise<void> {
        try {


            const { projectId, ...taskData } = req.body;

            if (!projectId) {
                const response = BaseResponseDto.badRequest('Project ID is required');
                res.status(response.statusCode).json(response);
                return;
            }


            const user = req.user;
            if (!user) {
                const response = BaseResponseDto.unauthorized('Unauthorized: No user found.');
                res.status(response.statusCode).json(response);
                return;
            }


            const result = await this.createTaskUseCase.execute(taskData, projectId);
            if (!result.success) {  
                const message = result.message || 'An error occurred while creating the task';
                const response = BaseResponseDto.badRequest(message);  
                res.status(response.statusCode).json(response);  
                return;  
            }   

       
            if (result.task) {
                const taskId = result.task._id; 
                await this.updateProjectUseCase.addTaskToProject(projectId, taskId);   
            }

            const response = BaseResponseDto.success(result.task, 'Task created successfully');  
            res.status(response.statusCode).json(response);  


        } catch (error) {

            console.error('Create Task Error:', error);
            const response = BaseResponseDto.serverError('An error occurred while creating the task');
            res.status(response.statusCode).json(response);
        }
    }

    // public async getTasksByProject(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { projectId } = req.params;

    //         if (!projectId) {
    //             const response = BaseResponseDto.badRequest('Project ID is required');
    //             res.status(response.statusCode).json(response);
    //             return;
    //         }

    //         const result = await this.getProjectTasksUseCase.execute(projectId);

    //         if (!result.success) {
    //             const statusCode = result.message.includes('not found') ? 404 : 400;
    //             res.status(statusCode).json(result);
    //             return;
    //         }

    //         if (!result.data || result.data.length === 0) {
    //             const response = BaseResponseDto.notFound('No tasks found for this project');
    //             res.json(response);
    //             return;
    //         }

    //         const response = BaseResponseDto.success(result.data);
    //         res.json(response);
    //     } catch (error) {
    //         console.error('Get Tasks by Project Error:', error);
    //         const response = BaseResponseDto.serverError('An error occurred while fetching project tasks');
    //         res.status(response.statusCode).json(response);
    //     }
}

// public async getUserTasks(req: Request, res: Response): Promise<void> {
//     try {
//         const user = req.user as IPublicUserData;

//         if (!user) {
//             const response = BaseResponseDto.unauthorized('Unauthorized: No user found.');
//             res.status(response.statusCode).json(response);
//             return;
//         }

//         const result = await this.getUserTasksUseCase.execute(user._id);

//         if (!result.success) {
//             res.status(400).json(result);
//             return;
//         }

//         if (!result.data || result.data.length === 0) {
//             const response = BaseResponseDto.notFound('No tasks found for this user');
//             res.json(response);
//             return;
//         }

//         const response = BaseResponseDto.success(result.data);
//         res.json(response);
//     } catch (error) {
//         console.error('Get User Tasks Error:', error);
//         const response = BaseResponseDto.serverError('An error occurred while fetching user tasks');
//         res.status(response.statusCode).json(response);
//     }
// }
