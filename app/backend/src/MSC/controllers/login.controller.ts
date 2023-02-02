import { Request, Response } from 'express';
import LoginServiceClass from '../services/login.service';

import { LoginRes } from '../../interfaces/MSC';

class LoginControllerClass {
  constructor(private loginService = new LoginServiceClass()) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { hasFail, mesage, token }: LoginRes = await this.loginService.login(email, password);
    if (hasFail) {
      res.status(401).json({ mesage });
    } else {
      res.status(200).json({ token });
    }
  };
}

export default LoginControllerClass;
