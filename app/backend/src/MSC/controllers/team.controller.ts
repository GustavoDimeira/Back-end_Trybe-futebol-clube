import { Request, Response } from 'express';
import TeamServiceClass from '../services/team.service';

import { TeamRes } from '../../interfaces/MSC';

class TeamControllerClass {
  constructor(private teamService: TeamServiceClass) {}

  public getTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams: TeamRes[] = await this.teamService.getTeams();
    if (teams) res.status(200).json(teams);
    else res.status(400).json({ message: 'Bad Request' });
  };

  public getTeam = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team: TeamRes | null = await this.teamService.getTeam(Number(id));
    if (team) res.status(200).json({ id: team.id, teamName: team.teamName });
    else res.status(401).json({ message: 'Incorrect Id' });
  };
}

export default TeamControllerClass;
