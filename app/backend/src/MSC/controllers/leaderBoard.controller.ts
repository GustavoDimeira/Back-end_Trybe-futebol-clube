import { Request, Response } from 'express';
import LeaderBoardServiceClass from '../services/leaderBoard.service';

import { LeaderBoardTeam } from '../../interfaces/MSC';

import Matchs from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';

class LeaderBoardControllerClass {
  constructor(private matchService: LeaderBoardServiceClass) {}

  public getBoard = async (_req: Request, res: Response) => {
    const { teams, games } = await this.matchService.getBoard();

    const leaderBoardList: LeaderBoardTeam[] = this.getList(teams, games);
    leaderBoardList.sort((a, b) => {
      if (b.totalPoints === a.totalPoints) {
        if (b.totalVictories === a.totalVictories) {
          if (b.goalsBalance === a.goalsBalance) {
            if (b.goalsFavor === a.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            } return b.goalsFavor - a.goalsFavor;
          } return b.goalsBalance - a.goalsBalance;
        } return b.totalVictories - a.totalVictories;
      } return b.totalPoints - a.totalPoints;
    });

    res.status(200).json(leaderBoardList);
  };

  private filterTeams = (team: Teams, game: Matchs) => {
    const awayId = game.awayTeamId;
    const homeId = game.homeTeamId;
    return awayId === team.id || homeId === team.id;
  };

  private getList = (teams: Teams[], games: Matchs[]) => {
    const finalVariable: LeaderBoardTeam[] = [];
    teams.forEach((team) => {
      const gamesEnded = games.filter((game) => this.filterTeams(team, game));
      const { wins, lost, drawns, goals, goalsOwn } = this.getTeamVariables(gamesEnded, team.id);

      finalVariable.push({
        name: team.teamName,
        totalPoints: wins * 3 + drawns,
        totalGames: wins + drawns + lost,
        totalVictories: wins,
        totalLosses: lost,
        totalDraws: drawns,
        goalsFavor: goals,
        goalsOwn,
        goalsBalance: goals - goalsOwn,
        efficiency: Number((((wins * 3 + drawns) / ((wins + drawns + lost) * 3)) * 100).toFixed(2)),
      });
    });
    return finalVariable;
  };

  private getTeamVariables = (gamesEnded: Matchs[], id: number) => {
    let wins = 0;
    let lost = 0;
    let drawns = 0;
    let goals = 0;
    let goalsOwn = 0;
    gamesEnded.forEach((game) => {
      const newGoals = (game.homeTeamId) === id ? game.homeTeamGoals : game.awayTeamGoals;
      const newGoalsOwn = (game.homeTeamId) !== id ? game.homeTeamGoals : game.awayTeamGoals;
      goals += newGoals;
      goalsOwn += newGoalsOwn;
      if (newGoals > newGoalsOwn) wins += 1;
      else if (newGoals < newGoalsOwn) lost += 1;
      else drawns += 1;
    });
    return { wins, lost, drawns, goals, goalsOwn };
  };
}

export default LeaderBoardControllerClass;
