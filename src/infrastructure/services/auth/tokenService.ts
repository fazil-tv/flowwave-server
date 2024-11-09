import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'muhammed';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'fazil_tv';


export const generateToken = (userId: string) => {

    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
    
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error('Refresh token verification failed:', error);
        return null;
    }
};