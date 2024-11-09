import { Request, Response } from 'express';


import UserService from '../../../application/usecases/admin/getuserUsecase';

import { AdminLoginUseCase } from '../../../application/usecases/admin';  



export class AdminController {
    private adminLoginUseCase: AdminLoginUseCase;
    private userService: UserService;

    constructor() {
   
        this.adminLoginUseCase = new AdminLoginUseCase();
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            console.log(email,"email","password",password)
            const tokens = this.adminLoginUseCase.login(email, password);

            console.log(tokens,"token");

            if (tokens) {
                res.cookie('access_admin_token', tokens.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                res.cookie('refresh_admin_token', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                });

                res.status(200).json({success: true, message: 'Login successful' ,tokens});
            } else {
                res.status(401).json({success: false, error: 'Invalid email or password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();

            if (users.length > 0) {
                res.status(200).json({ success: true, users });
            } else {
                res.status(404).json({ success: false, message: 'No users found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

}
