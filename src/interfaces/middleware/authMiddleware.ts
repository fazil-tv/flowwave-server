import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { User } from '../../domain/entities';

interface AuthenticatedRequest extends Request {
  user?: any;
}


const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {

    
    const token = req.cookies.token; 

    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string || "muhammed"); 

    req.user = {id: decoded.id} 


    if (!req.user.id) {
      return res.status(404).json({ message: 'User ID not found.' });
    }

    next();
    
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};

export default authMiddleware;
