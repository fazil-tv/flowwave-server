import { User, Otp } from '../../entities';

export interface IOtpRepository {
    saveOtpForUser(user: User, otp: Otp): Promise<void>;
    executeOtpVerification(email: string, otp: string): Promise<{ user: any, isValid: boolean }>;
}
