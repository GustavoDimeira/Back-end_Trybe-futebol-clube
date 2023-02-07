import Matchs from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';

class LeaderBoardServiceClass {
  public getBoard = async (): Promise<{ teams: Teams[], games: Matchs[] }> => {
    const teams: Teams[] = await Teams.findAll();
    const games: Matchs[] = await Matchs.findAll({ where: { inProgress: false } });

    return { teams, games };
  };
}

export default LeaderBoardServiceClass;
