import { IUserRepository } from "../../repositories";
import { generateRefreshToken , generateToken } from "../../services";
import { verifyPassword } from "../../utils";


import dotenv from 'dotenv';
dotenv.config();


export class LoginUseCase {


    constructor(private loginRepository: IUserRepository) { }

    async execute(email: string, password: string): Promise<any> {

        if (!email || !password) {
            console.log("Invalid input");
        }


        const user = await this.loginRepository.findByEmail(email);


        if (!user) {
            console.log("User not found");
            return;
        }


        if (user.isBlocked) {
            console.log("User is Blocked");
            return;
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            console.log("invalid password");
            return
        }

        const token = generateToken((user._id as string).toString())

        const refreshtoken = generateRefreshToken((user._id as string).toString())

        return { success: true, token, refreshtoken };


    }
}