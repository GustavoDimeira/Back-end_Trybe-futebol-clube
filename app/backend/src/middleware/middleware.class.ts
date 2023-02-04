import { Request, Response, NextFunction } from 'express';

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
}

export default MiddlewareClass;
