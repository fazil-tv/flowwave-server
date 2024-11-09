import { OTP } from "./OTP";

export interface UserDTO {
    _id?: any;
    username: string;
    email: string;
    profileImg: string | null
    password: string;
    isBlocked: boolean
    otp?: OTP;
    isVerified: boolean; 
}
