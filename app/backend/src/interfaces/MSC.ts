export interface LoginRes {
  token?: string,
  message?: string,
  hasFail: boolean,
}

export type TeamRes = {
  id: number,
  teamName: string,
}[];

export interface DbLoginAnswer {
  username?: string,
  password: string,
}
