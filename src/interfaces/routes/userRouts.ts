import { Router } from "express";
import multer from 'multer';  
const router = Router();
const upload = multer({ dest: 'public/uploads/' });  

import { ProjectController, UserController } from "../controllers";
import authMiddleware from "../middleware/authMiddleware";
import { InitiateProjectUseCase, LoginUseCase, SignupUseCase, VerifyOtpUseCase } from "../../application/usecases/user";
import { ProjectRepository, UserRepository } from "../../domain/repositories";
import { GetProjectsUseCase } from "../../application/usecases/projects/getprojectusecase";
import { GetProjectByIdUseCase } from "../../application/usecases/projects/GetProjectByIdUseCase";
import { GetUserProjectsUseCase } from "../../application/usecases/projects";
import { GetUserByIdUseCase } from "../../application/usecases/user";
import { GoogleSignUpUseCase } from "../../application/usecases/user";
import { OtpService } from "../../infrastructure/services";
import { NodemailerEmailService } from "../../infrastructure/services";
import { MongoOtpRepository } from "../../domain/repositories";
import { SendOtp } from "../../application/usecases/user";
import { UpdateProjectUseCase } from "../../application/usecases/projects";
import { GetProjectWithTasksUseCase } from "../../application/usecases/projects/GetProjectWithTasksUseCase";
import { GetProjectMembersUseCase } from "../../application/usecases/members/getprojectmembersUsecases";
import { UserProfileUseCase } from "../../application/usecases/user/UserProfileUseCase";



const projectRepository = new ProjectRepository();
const userRepository = new UserRepository();
const emailService = new NodemailerEmailService();
const otpService = new OtpService(emailService);
const otpRepository = new MongoOtpRepository();



const sendOtpUseCase = new SendOtp(
    otpService,
    otpRepository
);

const loginUseCase = new LoginUseCase(
    userRepository
);


const userProfileUseCase = new UserProfileUseCase(
    userRepository
);





const signupUseCase = new SignupUseCase(
    userRepository
);


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

const getProjectMembersUseCase = new GetProjectMembersUseCase(projectRepository)

const googleSignUpUseCase = new GoogleSignUpUseCase(
    userRepository
);

const verifyOtpUseCase = new VerifyOtpUseCase(
    otpRepository,
    userRepository

);

const getUserByIdUseCase = new GetUserByIdUseCase(
    userRepository
);

const updateProjectUseCase = new UpdateProjectUseCase(
    projectRepository
);

const getProjectWithTasksUseCase = new GetProjectWithTasksUseCase(
    projectRepository
);

const projectController = new ProjectController(initiateProjectUseCase, getProjectsUseCase, getUserProjectsUseCase, getProjectByIdUseCase,updateProjectUseCase ,getProjectWithTasksUseCase,getProjectMembersUseCase)
const userController = new UserController(signupUseCase, loginUseCase, sendOtpUseCase, verifyOtpUseCase, googleSignUpUseCase, getUserByIdUseCase,userProfileUseCase);


router.post('/user/initiateproject', authMiddleware, (req, res) => {

    projectController.createProject(req, res)

});


router.get('/user/getprojects', authMiddleware,
    (req, res) => {
  
        projectController.getUserProjects(req, res);
    }
)

router.get('/user/:id',
    (req, res) => {
        
        userController.getUserById(req, res)
    })

router.get('/user/getproject/:id',
    (req, res) => {
       
        projectController.getProjectById(req, res)

    });


router.patch('/user/projects/:id', authMiddleware, (req, res) => {  
    projectController.updateProject(req, res);  
});


router.get('/:projectId', authMiddleware, (req, res) => {
    console.log("routs was hited")
    projectController.getProjectWithTasks(req, res);
  });
  
  router.get('/team-members/:projectId', (req, res) => {
    projectController.getProjectTeamMembers(req, res)
  }
  );

  
  router.post('/profile-image', 
    authMiddleware, 
    upload.single('profileImage'), 
    userController.uploadProfileImage
  );



export default router;

