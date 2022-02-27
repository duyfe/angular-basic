export interface User {
  email: string
  name: string
  createAt: string
  updateAt: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface UserLoginResponse {
  accessToken: string
  user: User
}