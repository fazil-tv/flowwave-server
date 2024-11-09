export default interface VerifyOtpinterface {
  execute(email: string, otp: string): Promise<boolean>; 
}