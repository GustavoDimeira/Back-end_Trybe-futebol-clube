import * as express from 'express';

import LoginControllerClass from './MSC/controllers/login.controller';
import LoginServiceClass from './MSC/services/login.service';

import TeamControllerClass from './MSC/controllers/team.controller';
import TeamServiceClass from './MSC/services/team.service';

import MiddlewareClass from './middleware/middleware.class';

const loginService = new LoginServiceClass();
const loginController = new LoginControllerClass(loginService);

const teamService = new TeamServiceClass();
const teamController = new TeamControllerClass(teamService);

const middlewares = new MiddlewareClass();

const login = (t: App) => {
  t.app.post(
    '/login',
    middlewares.email,
    middlewares.password,
    loginController.login,
  );

  t.app.get(
    '/login/validate',
    loginController.adminLogin,
  );
};

const teams = (t: App) => {
  t.app.get(
    '/teams',
    teamController.getTeams,
  );

  t.app.get(
    '/teams/:id',
    teamController.getTeam,
  );
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    login(this);
    teams(this);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
