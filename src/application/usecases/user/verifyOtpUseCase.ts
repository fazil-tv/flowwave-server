import { IOtpRepository } from '../../../domain/repositories';
import { IUserRepository } from '../../../domain/repositories';
import { generateToken, generateRefreshToken } from '../../../infrastructure/services';
export class VerifyOtpUseCase{
    private OtpRepository: IOtpRepository;
    private UserRepository: IUserRepository;

    constructor(OtpRepository: IOtpRepository,UserRepository:IUserRepository) {

        this.OtpRepository = OtpRepository;
        this.UserRepository = UserRepository;
    }


    async execute(email: string, otp: string): Promise<any> {

        try {

            const { user, isValid } = await this.OtpRepository.executeOtpVerification(email, otp);

            if (isValid) {
                await this.UserRepository.updateUserOtpVerified(user._id);
                const token = generateToken(email);
                const refreshToken = generateRefreshToken(email);

                return { token, refreshToken };
            } else {

                return false;
                
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return false;
        }
    }
}