import { Request, Response } from 'express';
import MatchServiceClass from '../services/match.service';

import { MatchesRes } from '../../interfaces/MSC';

class teamControllerClass {
  constructor(private matchService: MatchServiceClass) {}

  public getTeamsMatches = async (req: Request, res: Response): Promise<void> => {
    const { q } = req.query;
    const teamsMatches: MatchesRes[] = await this.matchService.getTeamsMatches(q as string);
    res.status(200).json(teamsMatches);
  };
}

export default teamControllerClass;
