// Importações do vue
import { reactive, ref } from "vue"

// Importações de pacotes
import { defineStore } from "pinia"
import { useRouter } from "vue-router"

// Importações de tipos (primeiro de pacotes, depois próprios)
import type { Reactive, Ref } from "vue"
import type { Router } from "vue-router"
import type { User } from "@/interfaces/IUser"

export const useAuthStore = defineStore("authStore", () => {
  // Variaveis de controle de usuário
  const user: Reactive<Omit<Partial<User>, "password">> = reactive({})
  const isLoggedIn: Ref<boolean> = ref(false)

  // Definindo o router
  const router: Router = useRouter()

  // Função para recuperar usuários da API
  async function getUsers(): Promise<User[] | null> {
    try {
      // Faz um fetch sem dados da requisição (fetch de GET) e retorna os valores convertidos em json
      const users: User[] = await fetch("http://localhost:3000/users").then(
        async (res): Promise<User[]> => {
          return await res.json()
        }
      )
      // Retorna a array de usuários
      return users
    } catch (error) {
      console.log(error)
    }
    // Retorna nulo caso o fetch falhe
    return null
  }

  // Função para criação de cookies
  function setCookie(
    name: string,
    value: string | null,
    daysToLive: number | null
  ): void {
    const date: Date = new Date()
    // Se não estiver sendo chamado pelo método de deletar cookies (que setam essas variáveis para nulo)
    if (value !== null && daysToLive !== null) {
      // Pega a data atual e adiciona os dias que o cookie deve ter
      date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
    }
    // Define uma string de data de expiração para a adição no cookie
    let expires: string = "expires=" + date.toUTCString()
    // Cria o cookie
    document.cookie = `${name}=${value}; ${expires}; path=/`
  }

  // Função para deletar cookies
  function deleteCookie(name: string): void {
    // Cria um cookie com o nome do cookie a ser deletado com valor nulo e data de expirar nula, sobreescrevendo um cookie já criado com esses valores para que ele deixe de existir
    setCookie(name, null, null)
  }

  // Função para logar o usuário (usada no login e durante o recarregar da página)
  function login(
    userForm: Omit<User, "password">,
    rememberUser: boolean
  ): void {
    // Passa os dados do usuário a ser logado para a variável de controle de usuário da store
    Object.assign(user, userForm)
    // Muda o valor de loggedIn para true
    isLoggedIn.value = true
    if (rememberUser) {
      // Se quiser que os dados fiquem salvos, cria cookies com esses dados
      setCookie("user_id", user.id ? user.id : null, 10)
      setCookie("is_logged_in", isLoggedIn.value.toString(), 10)
    }
  }

  // Função para deslogar o usuário (usada no app e em casos de cookies remanescentes sem dados de um usuário)
  function logout(redirect: boolean = false): void {
    // Zera a variável de controle de usuário da store
    Object.assign(user, {
      id: "",
      login: "",
      username: {
        name: "",
        surname: "",
      },
    })
    // Muda o valor de loggedIn para false
    isLoggedIn.value = false
    // Deleta cookies de login
    deleteCookie("user_id")
    deleteCookie("is_logged_in")
    // Se quiser ser redirecionado, vai para a págna de login
    if (redirect) {
      router.push({ name: "login" })
    }
  }

  // Retorna propriedades e funções da store a serem usadas fora dela
  return { user, isLoggedIn, getUsers, login, logout }
})
