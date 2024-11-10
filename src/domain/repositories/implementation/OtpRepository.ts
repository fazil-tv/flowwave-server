import { IOtpRepository } from '../interface';
import { User } from '../../entities';
import { Otp } from '../../entities';
import { userModel } from '../../../infrastructure/database';


export class MongoOtpRepository implements IOtpRepository {
    async saveOtpForUser(user: User, otp: Otp): Promise<void> {
        try {

            const result = await userModel.findOneAndUpdate(
                { email: user.email },
                {
                    otp: {
                        value: otp.value,
                        expirationTime: otp.expirationTime,
                        verified: false
                    }
                },
                { new: true }
            );
            if (!result) {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Failed to save OTP:", error);
            throw error;
        }
    }


    async executeOtpVerification(email: string, otp: string): Promise<{ user: any, isValid: boolean }> {
        try {

            const user = await userModel.findOne({ email });

            if (!user || !user.otp) {
                return { user: null, isValid: false };
            }

            const { value: storedOtpValue, expirationTime } = user.otp;

            const isValid = storedOtpValue === otp && new Date() <= expirationTime;

            return { user, isValid };

        } catch (error) {
            console.error("Error during OTP verification:", error);
            return { user: null, isValid: false };
        }
    }

}