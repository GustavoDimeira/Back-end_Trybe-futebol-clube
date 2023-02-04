import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import Users from '../../database/models/UserModel';
import { LoginRes } from '../../interfaces/MSC';

const secret = process.env.JWT_SECRET || 'secret';

class LoginServiceClass {
  public login = async (email: string, password: string): Promise<LoginRes> => {
    const user = await Users.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { user: user.email, id: user.id, role: user.role },
        secret,
        { expiresIn: '24h', algorithm: 'HS256' },
      );
      return { token, hasFail: false };
    } return { message: 'Incorrect email or password', hasFail: true };
  };

  public roleValidation = (token: string) => jwt.decode(token, { json: true });
}

export default LoginServiceClass;
