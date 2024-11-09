import { Otp } from "../entities"; 
import { NodemailerEmailService } from "./NodemailerService";




export class OtpService {

    constructor(
        private emailService: NodemailerEmailService
    ) {}

    
    generateOtp(): Otp {
        const otpValue = Math.floor(100000 + Math.random() * 900000).toString(); 
        const expirationTime = new Date(Date.now() + 1 * 60 * 1000); 
        return new Otp(otpValue, expirationTime);
    }

    async sendOtp(email: string, otp: string): Promise<void> {
        console.log(`Sending OTP ${otp} to email ${email}`);
        await this.emailService.sendOtpEmail(email, otp);
    }
}