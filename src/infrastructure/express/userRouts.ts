import { Router } from "express";
const router = Router();
import { ProjectController, ServiceController } from "../../adapters/controllers";
import authMiddleware from "../../middleware/authMiddleware";
import { InitiateProjectUseCase } from "../../usecases/user";
import { ProjectRepository, UserRepository } from "../../repositories";
import { ServiceRepositoryImpl } from "../../repositories/implementation/serviceRepository";
import { GetProjectsUseCase } from "../../usecases/projects/getprojectusecase";
import { GetProjectByIdUseCase } from "../../usecases/projects/GetProjectByIdUseCase";
import { GetUserProjectsUseCase } from "../../usecases/projects";


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




const serviceController = new ServiceController();


const projectController = new ProjectController(initiateProjectUseCase, getProjectsUseCase, getUserProjectsUseCase, getProjectByIdUseCase)




router.get("/user/services", (req, res) => {
    serviceController.getAllServices(req, res);
});


router.get('/user/services/:id', (req, res) => {

    console.log("routs was hited", req.params.id);

    serviceController.getServiceById(req, res);

});

router.post('/user/initiateproject', authMiddleware, (req, res) => {
    projectController.initiateProject(req, res)

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

