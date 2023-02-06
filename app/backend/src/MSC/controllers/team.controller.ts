import { Request, Response } from 'express';
import TeamServiceClass from '../services/team.service';

import { TeamRes } from '../../interfaces/MSC';

class teamControllerClass {
  constructor(private teamService: TeamServiceClass) {}

  public getTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams: TeamRes = await this.teamService.getTeams();
    if (teams) res.status(200).json(teams);
    else res.status(400).json({ message: 'Bad Request' });
  };
}

export default teamControllerClass;
