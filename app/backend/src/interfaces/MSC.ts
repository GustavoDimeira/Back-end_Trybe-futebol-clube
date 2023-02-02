export interface LoginRes {
  token?: string,
  mesage?: string,
  hasFail: boolean,
}

export interface DbLoginAnswer {
  username?: string,
  password: string,
}
