import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendInvitationEmail = async (email: string, invitationToken: string) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'You have been invited!',
        html: `
            <div style="min-height: 100vh; background-color: #f3f4f6; padding: 2rem; display: flex; justify-content: center; align-items: center;">
                <div style="width: 100%; max-width: 600px; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(to top right, #100730, black, #100730); color: white; padding: 2rem; border-radius: 8px 8px 0 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <div style="width: 100px; height: 30px; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px; display: flex; justify-content: center; align-items: center; font-size: 14px; color: white;">
                                Logo
                            </div>
                            <div style="font-size: 14px;">Invitation</div>
                        </div>
                        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 1rem;">Welcome to Flowwave.com</h1>
                        <p style="font-size: 16px; color: #d1d5db; margin-bottom: 1.5rem;">
                            Flowwave.com combines powerful project management and easily streamlined operations — jump in to start managing your work.
                        </p>
                        <div style="margin-bottom: 2rem;">
                            <a href="${process.env.APP_URL}/accept-invitation?token=${invitationToken}" 
                                style="display: block; background-color: white; color: #100730; text-decoration: none; text-align: center; padding: 1rem; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                Accept Invitation
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #d1d5db;">
                            If you have any questions, please don't hesitate to contact us.
                        </p>
                    </div>
                    <div style="background-color: #0c051e; padding: 1rem; color: #6b7280; font-size: 14px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>© 2023 Flowwave.com</div>
                            <div style="display: flex; gap: 1rem;">
                                <div style="width: 24px; height: 24px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                                <div style="width: 24px; height: 24px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                                <div style="width: 24px; height: 24px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Invitation email sent successfully');
    } catch (error) {
        console.error('Error sending invitation email:', error);
        throw new Error('Email sending failed');
    }
};
