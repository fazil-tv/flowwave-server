import * as express from 'express';
import { User } from '../entities';
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
