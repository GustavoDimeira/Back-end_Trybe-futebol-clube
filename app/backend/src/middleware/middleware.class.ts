import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

class MiddlewareClass {
  public email = (req: Request, res: Response, next: NextFunction): void => {
    const { body: { email } } = req;
    if (!email) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else {
      next();
    }
  };

  public password = (req: Request, res: Response, next: NextFunction): void => {
    const { body: { password } } = req;
    if (!password) {
      res.status(400).json({ message: 'All fields must be filled' });
    } else {
      next();
    }
  };

  public tokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { headers: { authorization } } = req;
      if (authorization) {
        if (jwt.verify(authorization, secret)) next();
      } else res.status(401).json({ message: 'Token must be a valid token' });
    } catch (_e) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default MiddlewareClass;
