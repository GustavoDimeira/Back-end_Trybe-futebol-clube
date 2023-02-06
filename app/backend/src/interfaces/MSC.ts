export interface DbLoginAnswer {
  username?: string,
  password: string,
}

export interface LoginRes {
  token?: string,
  message?: string,
  hasFail: boolean,
}

export type TeamRes = {
  id: number,
  teamName: string,
};

export interface MatchesRes {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: {
    teamName: string,
  },
  awayTeam?: {
    teamName: string,
  },
}
