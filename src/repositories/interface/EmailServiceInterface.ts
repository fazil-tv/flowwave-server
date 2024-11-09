export interface EmailServiceInterface {
    sendOtpEmail(email: string, otp: string): Promise<void>;
}

