import { Router } from "express";
const router = Router();
import {UserController} from '../../adapters/controllers'
import { AdminController } from "../../adapters/controllers";
import { SignupUseCase } from "../../usecases/user";
import { LoginUseCase } from "../../usecases/user";
import { VerifyOtpUseCaseImpl } from "../../usecases/user";
import { GoogleSignUpUseCase } from "../../usecases/user";

import { SendOtp } from "../../usecases/user";
import { UserRepository,MongoOtpRepository } from "../../repositories";
import { OtpService } from "../../services";
import { NodemailerEmailService } from "../../services";


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

const VerifyOtpUseCase = new VerifyOtpUseCaseImpl(
    userRepository
);
const googleSignUpUseCase = new GoogleSignUpUseCase(
    userRepository
);




const userController = new UserController(signupUseCase,loginUseCase,sendOtpUseCase,VerifyOtpUseCase,googleSignUpUseCase);
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