import { Router } from "express";
const router = Router();
import {UserController} from '../controllers'
import { AdminController } from "../controllers";
import { SignupUseCase } from "../../application/usecases/user";
import { LoginUseCase } from "../../application/usecases/user";
import { VerifyOtpUseCase } from "../../application/usecases/user";
import { GoogleSignUpUseCase } from "../../application/usecases/user";

import { SendOtp } from "../../application/usecases/user";
import { UserRepository,MongoOtpRepository } from "../../domain/repositories";
import { OtpService } from "../../infrastructure/services";
import { NodemailerEmailService } from "../../infrastructure/services";


const emailService = new NodemailerEmailService();
const userRepository = new UserRepository();
const otpService = new OtpService(emailService); 
const otpRepository = new MongoOtpRepository(); 



const signupUseCase = new SignupUseCase(
    userRepository
);
const loginUseCase = new LoginUseCase(
    userRepository
);

const sendOtpUseCase = new SendOtp(
    otpService,
    otpRepository
);

const verifyOtpUseCase = new VerifyOtpUseCase(
    otpRepository,
    userRepository
    
);
const googleSignUpUseCase = new GoogleSignUpUseCase(
    userRepository
);




const userController = new UserController(signupUseCase,loginUseCase,sendOtpUseCase,verifyOtpUseCase,googleSignUpUseCase);
const adminController = new AdminController();



router.post("/user/register", (req, res, next) => {
    console.log("Register route hit");
    userController.signup(req, res, next);
});

router.post("/user/login", (req, res, next) => {
    console.log("login route hit");
    userController.login(req, res, next);
});

router.post("/user/verifyotp", (req, res, next) => {
    console.log("verifyotp route hit");
    userController.verifyOtp(req, res, next);
});

router.post("/user/googleSignIn", (req, res, next) => {
    console.log("googleSignIn route hit");
    userController.googleSignIn(req, res, next);
});



router.post("/admin/login", (req, res, next) => {
    
    console.log("admin login route hit");

    adminController.login(req, res);

});

export default router;