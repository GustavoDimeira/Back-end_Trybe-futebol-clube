import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import Users from '../../database/models/UserModel';
import { LoginRes } from '../../interfaces/MSC';

const secret = process.env.JWT_SECRET || 'secret';

class LoginServiceClass {
  public login = async (email: string, password: string): Promise<LoginRes> => {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { user: user.email, id: user.id },
          secret,
          { expiresIn: '24h', algorithm: 'HS256' },
        );
        return { token, hasFail: false };
      } return { mesage: 'senha incorreta', hasFail: true };
    } return { mesage: 'email incorreto', hasFail: true };
  };
}

export default LoginServiceClass;
