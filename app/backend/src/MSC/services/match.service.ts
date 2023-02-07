import Matchs from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';

import { MatchesRes, TeamRes } from '../../interfaces/MSC';

class MatchServiceClass {
  public getTeamsMatches = async (inProgress: string | undefined): Promise<MatchesRes[]> => {
    const matches: MatchesRes[] = (inProgress) ? (
      await Matchs.findAll({ where: { inProgress: (inProgress === 'true') } })
    ) : (
      await Matchs.findAll()
    );
    const teams: TeamRes[] = await Teams.findAll();
    matches.forEach((match, i) => {
      const homeTeam = teams.find((team) => team.id === match.homeTeamId);
      const awayTeam = teams.find((team) => team.id === match.awayTeamId);
      this.makeTeamResponse(matches, match, i, [homeTeam?.teamName, awayTeam?.teamName]);
    });
    return matches;
  };

  public addTeamsMatche = async (
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<{ match?: MatchesRes, fail: boolean }> => {
    const team1 = await Teams.findOne({ where: { id: homeTeamId } });
    const team2 = await Teams.findOne({ where: { id: awayTeamId } });
    if (team1 && team2) {
      const match = await Matchs.create({
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
      });
      return { match, fail: false };
    } return { fail: true };
  };

  public finishMatch = async (id: number): Promise<number> => {
    const [matchUpdated] = await Matchs.update({ inProgress: 'false' }, { where: { id } });
    return matchUpdated;
  };

  public updateMatchScore = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> => {
    const [matchUpdated] = await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return matchUpdated;
  };

  private makeTeamResponse = (
    matches: MatchesRes[],
    match: MatchesRes,
    i: number,
    teams: [string | undefined, string | undefined],
  ): void => {
    matches.splice(i, 1, {
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: teams[0] || 'unknowTeam' },
      awayTeam: { teamName: teams[1] || 'unknowTeam' },
    });
  };
}

export default MatchServiceClass;
