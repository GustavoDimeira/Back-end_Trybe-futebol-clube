import { Request, Response } from 'express';
import LoginServiceClass from '../services/login.service';

import { LoginRes } from '../../interfaces/MSC';

class LoginControllerClass {
  constructor(private loginService = new LoginServiceClass()) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { hasFail, message, token }: LoginRes = await this.loginService.login(email, password);
    if (hasFail) {
      res.status(401).json({ message });
    } else {
      res.status(200).json({ token });
    }
  };

  public adminLogin = (req: Request, res: Response): void => {
    const { headers: { authorization } } = req;
    if (authorization) {
      const payLoad = this.loginService.roleValidation(authorization);
      switch (payLoad?.role) {
        case 'admin':
          res.status(200).json({ role: 'admin' });
          break;
        default:
          res.status(401).json({ message: 'Error' });
      }
    }
  };
}

export default LoginControllerClass;
