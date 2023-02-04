export interface LoginRes {
  token?: string,
  message?: string,
  hasFail: boolean,
}

export interface DbLoginAnswer {
  username?: string,
  password: string,
}
