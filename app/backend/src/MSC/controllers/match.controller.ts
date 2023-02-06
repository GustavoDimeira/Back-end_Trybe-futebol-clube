import { Request, Response } from 'express';
import MatchServiceClass from '../services/match.service';

import { MatchesRes } from '../../interfaces/MSC';

class teamControllerClass {
  constructor(private matchService: MatchServiceClass) {}

  public getTeamsMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const teamsMatches: MatchesRes[] = await this.matchService.getTeamsMatches(
      inProgress as string,
    );
    res.status(200).json(teamsMatches);
  };

  public addTeamsMatche = async (req: Request, res: Response): Promise<void> => {
    const equals = { message: 'It is not possible to create a match with two equal teams' };
    const unknow = { message: 'There is no team with such id!' };
    const { homeTeamId, awayTeamId,
      homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) res.status(422).json(equals);
    else {
      const newMatch: { match?: MatchesRes, fail: boolean } = await
      this.matchService.addTeamsMatche(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      if (newMatch.fail) res.status(404).json(unknow);
      else res.status(200).json(newMatch);
    }
  };
}

export default teamControllerClass;
