// Importações das páginas
import LoginPage from "@/pages/login/LoginPage.vue"
import TodoCreationPage from "@/pages/todo-creation/TodoCreationPage.vue"
import TodoListPage from "@/pages/todo-list/TodoListPage.vue"
import NotFoundPage from "@/pages/not-found/NotFoundPage.vue"
import AccessDeniedPage from "@/pages/access-denied/AccessDeniedPage.vue"

// Importações do router
import { createRouter, createWebHistory } from "vue-router"

// Importação da store de autenticação
import { useAuthStore } from "@/stores/authStore"

// Importação do tipo personalizado "User"
import type { User } from "@/interfaces/IUser"

import { useTodoStore } from "@/stores/todoStore"

export const router = createRouter({
  // Rotas baseadas em caminhos nomeados
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Rota raiz redireciona o usuário para rota de login
      path: "/",
      redirect: { name: "login" },
    },
    {
      // Rota de login
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      // Rota de criação de todos
      path: "/todo-creation",
      name: "todo-creation",
      component: TodoCreationPage,
    },
    {
      // Rota de listagem de todos
      path: "/todo-list",
      name: "todo-list",
      component: TodoListPage,
    },
    {
      // Rota de acesso negado
      path: "/no-access",
      name: "no-access",
      component: AccessDeniedPage,
    },
    {
      // Rota not found
      path: "/not-found",
      name: "not-found",
      component: NotFoundPage,
    },
    {
      // Redireciona qualquer caminho não especificado para rota not found
      path: "/:pathMatch(.*)*",
      redirect: { name: "not-found" },
    },
  ],
})

// Conferência deautenticação antes de cada rota
router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Se usuário já está logado e está utilizando o sistema de navegação, permitir tráfego
  if (authStore.isLoggedIn) return true

  // Função para recuperar cookies
  function getCookie(name: string): string | null {
    // Retorna todos cookies descodificados
    const cDecoded: string = decodeURIComponent(document.cookie)
    // Separa cada cookie com chave e valor num indice de uma array
    const cArray: string[] = cDecoded.split("; ")
    // Cookie nulo por padrão para retorno
    let cookie: string | null = null
    cArray.forEach((element: string) => {
      // Se o nome do cookie bate com o primeiro texto encontrado no indice da array, adiciona o valor dele no cookie para retorno
      if (element.indexOf(name) === 0) {
        cookie = element.substring(name.length + 1)
      }
    })
    return cookie
  }

  // Recuperando cookies de login
  const cookieLoggedIn: string | null = getCookie("is_logged_in")
  const cookieUserId: string | null = getCookie("user_id")

  // Criando variaveis para controle de fluxo e login
  let user: Omit<User, "password"> | null = null
  let serverError: boolean = false

  if (cookieLoggedIn && cookieUserId) {
    // Se houverem cookies, tenta pegar os usuários da API
    const usersDb: User[] | null = await authStore.getUsers()
    if (usersDb) {
      // Se API retornou dados, confere se os cookies batem com algum usuário
      const userMatch: User[] = usersDb.filter(
        (user: User) => user.id === cookieUserId
      )
      if (userMatch.length > 0) {
        // Se cookies batem com um usuário, prossegue com o login
        const [{ password, ...userNoPass }] = userMatch
        user = userNoPass
        authStore.login(userNoPass, true)
        const todoStore = useTodoStore()
        const showTodoTypes = localStorage.getItem("showTodoTypes")
        if (showTodoTypes) {
          const showTodoTypesArray: string[] = JSON.parse(showTodoTypes)
          showTodoTypesArray.forEach((element) => {
            todoStore.showTodoTypes.push(element)
          })
        }
        const showTodoAvaiability = localStorage.getItem("showTodoAvaiability")
        if (showTodoAvaiability) {
          todoStore.showTodoAvaiability = showTodoAvaiability
        }
      }
    } else {
      // Se API não retornar usuários, houve erro no servidor
      serverError = true
    }
  }

  if (user) {
    // Se houver usuário, checa se ele está indo para rota de login ou no-access e barra ele
    if (to.name === "login" || to.name === "no-access") {
      router.push({ name: "todo-creation" })
    }
    // Permite o trafêgo em outros casos
    return true
  } else {
    // Se não tem usuário confere se tem algum cookie sobrando e deleta eles
    if (cookieLoggedIn || cookieUserId) {
      authStore.logout()
    }
    if (to.name !== "login" && to.name !== "no-access") {
      // Se for qualquer rota tirando o login e no-access, confere se houve erro no servidor e redireciona o usuário baseado nisso
      if (serverError) {
        alert(
          "There has been an error trying to recover your user from the database.\nPlease, try again later."
        )
        router.push({ name: "login" })
      }
      router.push({ name: "no-access" })
    }
    return true
  }
})
