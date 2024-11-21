import { ITask } from "../../../application/interfaces/task.interface";
import { CreateTaskDTO } from "../../../application/dtos/user/TaskDTO";
import { UpdateTaskDTO } from "../../../application/dtos/user/TaskDTO";


export interface ITaskRepository {
  create(task: CreateTaskDTO,projectId:string,taskCode:string): Promise<ITask>;
  findById(id: string): Promise<ITask | null>;
  findByProject(projectId: string): Promise<ITask[]>;
  update(id: string, data: UpdateTaskDTO): Promise<ITask | null>;
  delete(id: string): Promise<boolean>;
  softDelete(id: string): Promise<boolean>;
  findTaskByNameInProject(taskName: string, projectId: string): Promise<ITask | null>;
}