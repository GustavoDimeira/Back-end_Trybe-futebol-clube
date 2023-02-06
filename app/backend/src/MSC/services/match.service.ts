import Matchs from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';

import { MatchesRes, TeamRes } from '../../interfaces/MSC';

class MatchServiceClass {
  public getTeamsMatches = async (matchStatus: string): Promise<MatchesRes[]> => {
    const matches: (MatchesRes)[] = matchStatus === 'inProgress' ? (
      await Matchs.findAll({ where: { inProgress: true } })
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
