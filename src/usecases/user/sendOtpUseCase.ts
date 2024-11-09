import { User } from "../../entities";
import { Otp } from "../../entities";
import { OtpService } from "../../services";
import { MongoOtpRepository } from "../../repositories";


export class SendOtp {
    constructor(
        private otpService: OtpService,
        private OtpRepository: MongoOtpRepository
    ) {}


    async execute(user: User): Promise<Otp> {

        const otp = this.otpService.generateOtp();
        await this.OtpRepository.saveOtpForUser(user,otp)
        await this.otpService.sendOtp(user.email, otp.value);
        
        return otp;
    }
}

