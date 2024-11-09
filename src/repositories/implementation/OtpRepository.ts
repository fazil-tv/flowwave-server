import { otpinterface } from '../interface';
import { User } from '../../entities';
import { Otp } from '../../entities';
import { userModel } from '../../infrastructure/db';


export class MongoOtpRepository implements otpinterface {
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
}