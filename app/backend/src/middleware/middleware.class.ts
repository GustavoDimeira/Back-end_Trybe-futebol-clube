import { Request, Response, NextFunction } from 'express';

const validateNumber = (
  name: string,
  variable: number,
  express: [res: Response, next: NextFunction],
  testing: [string, number],
): void => {
  if (variable === undefined) {
    express[0].status(400).json({ message: `"${name}" is required` });
  } else if (typeof variable !== testing[0]) {
    express[0].status(422).json({ message: `"${name}" must be a ${testing[0]}` });
  } else if (variable <= 0) {
    express[0].status(422).json({ message: '"level" must be greater than or equal to 1' });
  } else {
    express[1]();
  }
};

const validateString = (
  name: string,
  variable: string,
  express: [res: Response, next: NextFunction],
  testing: [string, number],
): void => {
  if (!variable) {
    express[0].status(400).json({ message: `"${name}" is required` });
  } else if (typeof variable !== testing[0]) {
    express[0].status(422).json({ message: `"${name}" must be a ${testing[0]}` });
  } else if (variable.length < testing[1]) {
    express[0].status(422).json({
      message: `"${name}" length must be at least ${testing[1]} characters long`,
    });
  } else {
    express[1]();
  }
};

class MiddlewareClass {
  public nameValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { name } = req.body;
    validateString('name', name, [res, next], ['string', 3]);
  };

  public amountValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { amount } = req.body;
    validateString('amount', amount, [res, next], ['string', 3]);
  };

  public userNameValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { username } = req.body;
    validateString('username', username, [res, next], ['string', 3]);
  };

  public vocationValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { vocation } = req.body;
    validateString('vocation', vocation, [res, next], ['string', 3]);
  };

  public levelValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { level } = req.body;
    validateNumber('level', level, [res, next], ['number', 3]);
  };

  public passwordValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { password } = req.body;
    validateString('password', password, [res, next], ['string', 8]);
  };
}

export default MiddlewareClass;
