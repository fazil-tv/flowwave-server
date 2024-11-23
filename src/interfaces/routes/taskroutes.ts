import { Router } from "express";
const router = Router();
import { TaskController } from "../controllers";
import { TaskRepository } from "../../domain/repositories/implementation/task.repository";
import { CreateTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase, GetProjectTasksUseCase, } from "../../application/usecases/tasks";
import { ProjectRepository, UserRepository } from "../../domain/repositories";
import authMiddleware from "../middleware/authMiddleware";
import { UpdateProjectUseCase } from "../../application/usecases";
import { ProjectProgressService } from "../../infrastructure/services/common/ProjectProgressServices";





const taskRepository = new TaskRepository();
const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();


const updateProjectUseCase = new UpdateProjectUseCase(
    projectRepository
);

const progressService = ProjectProgressService.getInstance(
    taskRepository,
    projectRepository,
    updateProjectUseCase 
);


const createTaskUseCase = new CreateTaskUseCase(
    taskRepository, projectRepository,updateProjectUseCase
);
const updateTaskUseCase = new UpdateTaskUseCase(
    taskRepository,projectRepository,updateProjectUseCase
);
const getProjectTasksUseCase = new GetProjectTasksUseCase(
    taskRepository
);
const deleteTaskUseCase = new DeleteTaskUseCase(
    taskRepository
);





const taskController = new TaskController(createTaskUseCase, getProjectTasksUseCase, deleteTaskUseCase, updateProjectUseCase,updateTaskUseCase)

router.post('/tasks', authMiddleware, (req, res) => {
    taskController.createTask(req, res)
})


router.put('/tasks/:projectId', authMiddleware, (req, res) => {
   
    taskController.updateTask(req,res)
})







export default router;

