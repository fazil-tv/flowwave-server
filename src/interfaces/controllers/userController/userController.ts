import { NextFunction, Request, Response } from "express";

import {
    SignupUseCase,
    LoginUseCase,
    SendOtp,
    VerifyOtpUseCase,
    GoogleSignUpUseCase,
    GetUserByIdUseCase,
} from "../../../application/usecases/user"
import { UserProfileUseCase } from "../../../application/usecases/user/UserProfileUseCase";
import { BaseResponseDto } from "../../../application/dtos/common/BaseResponseDto";

export class UserController {
    constructor(
        private signupUseCase: SignupUseCase,
        private loginUseCase: LoginUseCase,
        private sendOtpUseCase: SendOtp,
        private verifyOtpUseCase: VerifyOtpUseCase,
        private googleSignUpUseCase: GoogleSignUpUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private userProfileUseCase: UserProfileUseCase
    ) {

        this.uploadProfileImage = this.uploadProfileImage.bind(this);
    }


    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {


        const { username, email, password } = req.body;

        try {

            const response = await this.signupUseCase.execute(username, email, password);

            if (response.isVerified) {

                res.status(400).json({ success: false, message: response.message });
                return;
            }

            const user = response.savedUser;

            if (!user) {
                res.status(400).json({ success: false, message: "User creation failed" });
                return;
            }

            const otp = await this.sendOtpUseCase.execute(user);

            console.log("OTP sent:", otp.value);

            if (user) {
                res.status(200).json({ success: true, email: user.email });

            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }


        } catch (error) {
            res.status(404).json({ success: false, otpSent: false });
            next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction): Promise<void> {

        const { email, password } = req.body;
        try {
            const user = await this.loginUseCase.execute(email, password);


            if (user) {

                res.cookie('token', user.token, {
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', user.refreshtoken, {

                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                res.status(200).json({ success: true, user });
            } else {

                res.status(404).json({ success: false, message: 'User not found' });

            }
        } catch (error) {

            next(error);

        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {

        const verificationData = req.body;
        console.log(verificationData.otp, verificationData.email, "verification data")

        try {

            if (!verificationData.email || !verificationData.otp) {
                res.status(400).json({ message: 'Email and OTP code are required' });
                return;
            }

            const isValid = await this.verifyOtpUseCase.execute(verificationData.email, verificationData.otp);




            const token = isValid.token
            const refreshToken = isValid.refreshToken

            if (isValid) {
                res.cookie('token', isValid.token, {

                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.cookie('refreshToken', isValid.refreshToken, {

                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });


                res.status(200).json({ success: true, message: 'OTP verified successfully', token, refreshToken });
            } else {
                res.status(400).json({ success: false, message: 'Invalid OTP' });
            }

        } catch (error) {
            next(error);
        }
    }






    async googleSignIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const { token } = req.body;

            if (token && token.access_token) {
                const accessToken = token.access_token;
                const token_type = token.token_type;


                const googleUser = await this.googleSignUpUseCase.execute(accessToken, token_type);



                if (googleUser) {



                    res.cookie('token', googleUser.token, {

                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 24 * 60 * 60 * 1000,
                    });

                    res.cookie('refreshToken', googleUser.refreshtoken, {

                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });




                    res.status(200).json({ success: true, googleUser });

                } else {
                    res.status(404).json({ success: false, message: 'User not found' });


                }



            } else {
                console.log("Access token not found");
            }

        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: any, res: Response) {
        const result = await this.getUserByIdUseCase.execute(req.params.id);
        res.status(result.statusCode).json(result);
    }



    async uploadProfileImage(req: any, res: Response) {
        try {
            const user = req.user?.id;
            const file = req.file;
    
            if (!user) {
                return res.status(401).json(BaseResponseDto.unauthorized('User not authenticated'));
            }
    
            if (!file) {
                return res.status(400).json(BaseResponseDto.badRequest('No file uploaded'));
            }
    
            const normalizedPath = file.path.replace(/\\/g, '/');
    
            const result = await this.userProfileUseCase.execute(user, normalizedPath);
    
            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json(BaseResponseDto.serverError());
        }
    }



};

