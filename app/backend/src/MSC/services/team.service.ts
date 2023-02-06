import Teams from '../../database/models/TeamModel';
import { TeamRes } from '../../interfaces/MSC';

class TeamServiceClass {
  public getTeams = async (): Promise<TeamRes> => Teams.findAll();
}

export default TeamServiceClass;
