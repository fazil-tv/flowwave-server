
import { googleAuthService } from "../../../infrastructure/services";
import { IUserRepository } from "../../../domain/repositories";
import { generateToken, generateRefreshToken } from "../../../infrastructure/services";

export class GoogleSignUpUseCase {

    constructor(private userRepository: IUserRepository) { }

    async execute(accessToken: string, token_type: string) {

        const googleUser = await googleAuthService.verifyGoogleToken(accessToken, token_type);

        let user = await this.userRepository.findByEmail(googleUser.email);

        if (!user) {
            user = await this.userRepository.create({
                _id: googleUser.id,
                username: googleUser.name,
                email: googleUser.email,
                password: googleUser.id,
            });
        }

        const userId = user._id as string;

        await this.userRepository.updateUserOtpVerified(userId);

        const token = generateToken((user.id as string).toString())

        const refreshtoken = generateRefreshToken((user.id as string).toString())

        return { success: true, token, refreshtoken, user };
    }
}

