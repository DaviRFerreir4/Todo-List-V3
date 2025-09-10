// Interface que representa os dados recebidos de um usuário do servidor
export interface User {
  id: string
  login: string
  username: {
    name: string
    surname: string
  }
  password: string
}
