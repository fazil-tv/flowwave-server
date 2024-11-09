import { User } from "../../entities";
import { Otp } from "../../entities";

export interface otpinterface {
    saveOtpForUser(user: User, otp: Otp): Promise<void>;
}