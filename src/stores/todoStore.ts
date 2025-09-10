// Importações do vue
import { reactive, ref } from "vue"

// Importações de pacotes
import { defineStore } from "pinia"

// Importação de tipos
import type { Reactive, Ref } from "vue"
import type { Todo } from "@/interfaces/ITodo"
import type { Features } from "@/types/Features"
import type { TodoType } from "@/types/TodoType"

export const useTodoStore = defineStore("todoStore", () => {
  // Variáveis de controle da lista de todos
  const todoList: Reactive<Todo[]> = reactive([])
  const showTodoTypes: Reactive<TodoType[]> = reactive([])
  const showTodoAvaiability: Ref<Features> = ref("all")

  // Função para retornar os dados de todos do usuário
  async function getData(userId: string | undefined): Promise<Todo[] | null> {
    try {
      if (userId) {
        // Se o userId foi passado, faz um fetch sem requisição na rota de todos e retorna o resultado convertido em json
        const dbTodos: Todo[] = await fetch("http://localhost:3000/todos").then(
          async (res) => {
            return await res.json()
          }
        )
        // Retorna a array revertida (para que os últimos dados fiquem na frente) e filtrada com o userId
        return dbTodos.reverse().filter((todo) => todo.userId === userId)
      }
    } catch (error) {
      console.log(error)
    }
    // Caso haja um erro na execução do fetch, retorna nulo
    return null
  }

  // Função para preencher a lista de todos da store
  function populateTodoList(todos: Todo[]): void {
    if (todoList.length > 0) {
      // Se a lista já possui algum valor, zera ela
      todoList.splice(0, todoList.length)
    }
    todos.forEach((todo) => {
      // Para cada todo na lista de todos passada por parâmetro, faz um push na lista da store com esse todo
      todoList.push(todo)
    })
  }

  // Função para criação de todo
  async function createTodo(newTodo: Todo): Promise<boolean> {
    try {
      if (
        await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        })
      ) {
        // Se a operação de POST do fetch com os dados do todo foi bem sucedida, adiciona o item no inicio da lista de todos e retorna true
        todoList.unshift(newTodo)
        return true
      }
    } catch (error) {
      console.log(error)
    }
    // Caso a operação falhe, retorna falso
    return false
  }

  // Função para atualizar o estado do todo
  async function updateTodoState(
    todoId: string,
    value: boolean
  ): Promise<boolean> {
    try {
      if (
        await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isChecked: value }),
        })
      ) {
        // Caso a operação de PATCH do fetch seja um sucesso, retorna true
        return true
      }
    } catch (error) {
      console.log(error)
    }
    // Caso a operação falhe, retorna false
    return false
  }

  // Função para deletar todos
  async function deleteTodo(todoId: string): Promise<boolean> {
    try {
      if (
        await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: "DELETE",
        })
      ) {
        // Se a operação de fetch com o método DELETE for um sucesso, remove o item da lista de todos da store e retorna true
        const index = todoList.findIndex((todo) => todo.id === todoId)
        todoList.splice(index, 1)
        return true
      } else {
        // Se não encontrar o id do item retorna false
        return false
      }
    } catch (error) {
      console.log(error)
    }
    // Se ocorrer um erro na operação retorna false
    return false
  }

  // Função para executar as features da página de listagem de todos
  function features(feature: Features): void {
    if (feature !== "clear") {
      // Se a feature não for "clear", simplesmente atualiza o valor da variável de filtro de todoAvaiability na todoStore e no localStorage
      showTodoAvaiability.value = feature
      localStorage.setItem("showTodoAvaiability", feature)
    } else {
      const todosToDelete = todoList.filter((todo) => todo.isChecked)
      todosToDelete.forEach((todo) => {
        // Se a feature for "clear", filtra os elementos a serem deletados (todos os todos checados) e utiliza a função de deletar todos para cada um dos itens
        deleteTodo(todo.id)
      })
    }
  }

  // Função para trocar o os tipos de todos com os dropdowns abertos
  function changeShowTodoTypes(
    todoTypes: TodoType[],
    reset: boolean = false,
    initialize: boolean = false
  ): void {
    if (reset) {
      // Se for preciso resetar, zera a lista de todos
      showTodoTypes.splice(0, showTodoTypes.length)
    }
    todoTypes.forEach((todoType) => {
      // Coloca os itens da lista de todoTypes dentro da variável de controle showTodoTypes da store
      showTodoTypes.push(todoType)
    })
    if (!initialize) {
      // Se o aplicativo não estiver sendo recarregado ou inicializado pela primeira vez, coloca os valores atualizados no localstorage
      localStorage.setItem("showTodoTypes", JSON.stringify(showTodoTypes))
    }
  }

  // Função para trocar os valores da lista de showTodoTypes
  function toggleShowTodoType(todoType: TodoType) {
    if (!showTodoTypes.find((todo) => todo === todoType)) {
      // Se não achar o item na lista, adiciona ele
      showTodoTypes.push(todoType)
    } else {
      // Se achar o item na lista, retira ele
      const index = showTodoTypes.findIndex((todo) => todo === todoType)
      showTodoTypes.splice(index, 1)
    }
    // Adiciona ao localStorage a lista atualizada
    localStorage.setItem("showTodoTypes", JSON.stringify(showTodoTypes))
  }

  // Função para mudar a feature sendo utilizada
  function changeShowTodoAvaiability(
    todoAvaiability: Features,
    initialize: boolean = false
  ): void {
    if (todoAvaiability !== "clear") {
      // Se a feature não for passada por parâmetro não for "clear", troca o valor da variável de controle da store para a feature sendo utilizada
      showTodoAvaiability.value = todoAvaiability
      if (!initialize) {
        // Se o aplicativo não estiver sendo inicializado ou recarregado, adiciona o valor atualizado da variável de controle ao localStorage
        localStorage.setItem("showTodoAvaiability", todoAvaiability)
      }
    }
  }

  // Retorna as propriedades e funções sendo utilizadas fora da store
  return {
    todoList,
    showTodoTypes,
    showTodoAvaiability,
    getData,
    populateTodoList,
    createTodo,
    updateTodoState,
    deleteTodo,
    features,
    changeShowTodoTypes,
    toggleShowTodoType,
    changeShowTodoAvaiability,
  }
})
