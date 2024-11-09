import * as express from 'express';
import { User } from '../domain/entities';
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
