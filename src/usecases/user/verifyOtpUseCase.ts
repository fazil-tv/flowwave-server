import VerifyOtpinterface from '../../repositories/interface/VerifyOtpinterface';
import { UserRepository } from '../../repositories';
import { generateToken , generateRefreshToken } from '../../services';


export class VerifyOtpUseCaseImpl implements VerifyOtpinterface {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string, otp: string): Promise<  any> {

        try {

            const user = await this.userRepository.getCurrentUser(email);

     
            if (!user || !user.otp) {
                return false;
            }

            const { value: storedOtpValue, expirationTime } = user.otp;

            console.log('Stored OTP Value:', storedOtpValue);
            console.log('Provided OTP:', otp);


            if (storedOtpValue === otp && new Date() <= expirationTime) {

                await this.userRepository.updateUserOtpVerified(user._id);

                const token = generateToken((user._id as string).toString())
             
                const refreshToken = generateRefreshToken((user._id as string).toString())


                return {
                    refreshToken,
                    token
                };
            } else {
                return false
            }

        } catch (error) {
            console.error('Error verifying OTP:', error);
            return false;
        }
    }
}