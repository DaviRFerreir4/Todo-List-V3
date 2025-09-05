export interface User {
  id: string
  login: string
  username: {
    name: string
    surname: string
  }
  password?: string
}
