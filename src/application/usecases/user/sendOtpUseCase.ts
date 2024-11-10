import { User } from "../../../domain/entities";
import { Otp } from "../../../domain/entities";
import { OtpService } from "../../../infrastructure/services";
import { MongoOtpRepository } from "../../../domain/repositories";
import { IUseCase } from "../../interfaces/IUseCase";


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

