import Teams from '../../database/models/TeamModel';
import { TeamRes } from '../../interfaces/MSC';

class TeamServiceClass {
  public getTeams = async (): Promise<TeamRes[]> => Teams.findAll();

  public getTeam = async (id: number): Promise<TeamRes | null> => Teams.findOne({ where: { id } });
}

export default TeamServiceClass;
