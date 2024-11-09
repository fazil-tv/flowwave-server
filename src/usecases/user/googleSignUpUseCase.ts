
import { googleAuthService } from "../../services";
import { UserRepository } from "../../repositories";
import { generateToken ,generateRefreshToken} from "../../services";

export class GoogleSignUpUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute(accessToken: string,token_type:string) {

        const googleUser = await googleAuthService.verifyGoogleToken(accessToken, token_type);

        console.log(googleUser, "googleUser");
        console.log(googleUser.email, "googleUser.email");


        let user = await this.userRepository.findByEmail(googleUser.email);

        if (!user) {
                user = await this.userRepository.create({
                    _id: googleUser.id,
                    username: googleUser.name,
                    email: googleUser.email,
                    password: googleUser.id,
                });
        }

        const token = generateToken((user.id as string).toString())

        const refreshtoken = generateRefreshToken((user.id as string).toString())

        return {  success: true,token,refreshtoken,user };
    }
}

