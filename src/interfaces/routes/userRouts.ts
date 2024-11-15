import { Router } from "express";
const router = Router();
import { ProjectController } from "../controllers";
import authMiddleware from "../middleware/authMiddleware";
import { InitiateProjectUseCase } from "../../application/usecases/user";
import { ProjectRepository, UserRepository } from "../../domain/repositories";
import { ServiceRepositoryImpl } from "../../domain/repositories/implementation/serviceRepository";
import { GetProjectsUseCase } from "../../application/usecases/projects/getprojectusecase";
import { GetProjectByIdUseCase } from "../../application/usecases/projects/GetProjectByIdUseCase";
import { GetUserProjectsUseCase } from "../../application/usecases/projects";


const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();
const serviceRepository = new ServiceRepositoryImpl();



const initiateProjectUseCase = new InitiateProjectUseCase(
    projectRepository, userRepository
);


const getProjectsUseCase = new GetProjectsUseCase(
    projectRepository
);



const getUserProjectsUseCase = new GetUserProjectsUseCase(
    projectRepository
);



const getProjectByIdUseCase = new GetProjectByIdUseCase(
    projectRepository
);



const projectController = new ProjectController(initiateProjectUseCase, getProjectsUseCase, getUserProjectsUseCase, getProjectByIdUseCase)



router.post('/user/initiateproject', authMiddleware, (req, res) => {
   
    projectController.createProject(req, res)

});


router.get('/user/getprojects', authMiddleware,
    (req, res) => {
        projectController.getAllProjects(req, res)
    });


router.get('/user/getuserprojects', authMiddleware,
    (req, res) => {
        console.log("routs was hited sucecessfully");
        projectController.getUserProjects(req, res)

    });

router.get('/user/getproject/:id',
    (req, res) => {
        projectController.getProjectById(req, res)

    });





export default router;

