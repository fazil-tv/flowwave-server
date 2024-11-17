
export interface OTP {
    value: string;
    expirationTime: Date;
}

export interface IUserData {
    _id?: any ;
    username: string;
    email: string;
    profileImg: string | null
    password: string;
    isBlocked: boolean
    otp?: OTP;
    isVerified: boolean; 
}

export class User {
    _id?: any;
    username: string;
    email: string;
    profileImg: string | null
    password: string;
    isBlocked: boolean
    otp?: OTP;
    isVerified: boolean; 

    constructor({ _id, username, email,  password, otp, profileImg, isBlocked ,isVerified}: IUserData) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.profileImg = profileImg ?? null;
        this.password = password;
        this.isBlocked = isBlocked ?? false;
        this.otp = otp;
        this.isVerified = isVerified;
    }
}