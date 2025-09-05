// Importações do vue
import { reactive, ref } from "vue"

// Importações de pacotes
import { defineStore } from "pinia"
import { useRouter } from "vue-router"

// Importações de tipos (primeiro de pacotes, depois próprios)
import type { Reactive, Ref } from "vue"
import type { User } from "@/interfaces/IUser"

export const useAuthStore = defineStore("authStore", () => {
  // Variaveis de controle de usuário
  const user: Reactive<Omit<Partial<User>, "password">> = reactive({})
  const isLoggedIn: Ref<boolean> = ref(false)
  const router = useRouter()

  // Função para recuperar usuários da API
  async function getUsers(): Promise<User[] | null> {
    try {
      const users: Promise<User[]> = await fetch(
        "http://localhost:3000/users"
      ).then(async (res) => {
        return await res.json()
      })
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
      // pega a data atual e adiciona os dias que o cookie deve ter
      date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000)
    }
    let expires: string = "expires=" + date.toUTCString()
    document.cookie = `${name}=${value}; ${expires}; path=/`
  }

  // Função para deletar cookies
  function deleteCookie(name: string): void {
    setCookie(name, null, null)
  }

  // Função para logar o usuário (usada no login e durante o recarregar da página)
  function login(userForm: User, rememberUser: boolean): void {
    Object.assign(user, userForm)
    isLoggedIn.value = true
    if (rememberUser) {
      setCookie("user_id", user.id ? user.id : null, 10)
      setCookie("is_logged_in", isLoggedIn.value.toString(), 10)
    }
  }

  // Função para deslogar o usuário (usada no app e em casos de cookies remanescentes sem dados de um usuário)
  function logout(redirect: boolean = false): void {
    Object.assign(user, {
      id: "",
      login: "",
      username: {
        name: "",
        surname: "",
      },
    })
    isLoggedIn.value = false
    deleteCookie("user_id")
    deleteCookie("is_logged_in")
    if (redirect) {
      router.push({ name: "login" })
    }
  }

  return { user, isLoggedIn, getUsers, login, logout }
})
