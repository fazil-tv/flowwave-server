import { OtpDTO } from "./OTP";

export interface UserDTO {
    _id?: any;
    username: string;
    email: string;
    profileImg: string | null
    password: string;
    isBlocked: boolean
    otp?: OtpDTO;
    isVerified: boolean; 
}
