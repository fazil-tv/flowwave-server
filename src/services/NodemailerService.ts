import nodemailer from 'nodemailer';
import { EmailServiceInterface } from '../repositories';
import dotenv from 'dotenv';
dotenv.config();



export class NodemailerEmailService implements EmailServiceInterface {


    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
        });
    }

    async sendOtpEmail(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: 'farc348@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            html: `
                <div style="background: linear-gradient(to top right, #100730 0%, black 30%, #100730 100%); 
                            height: auto; 
                            justify-content: center; 
                            align-items: center; 
                            color: white; 
                            text-align: center; 
                            font-size: 24px; 
                            border-radius: 8px;
                            padding: 70px;">
                    <p>Your OTP code is:</p>
                    <h1 style="font-size: 48px; margin: 10px 0;">${otp}</h1>
                    <h6 style="font-size: 16px; color: lightgray;">It will expire in 1 minute.</h6>
                </div>
            `,
        };
    
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`OTP email sent to ${email}`);
        } catch (error) {
            console.error(`Error sending OTP email: ${error}`);
        }
    }
    
}
