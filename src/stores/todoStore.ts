import { defineStore } from "pinia"
import { popScopeId, reactive, ref } from "vue"
import type { Reactive, Ref } from "vue"
import type { Todo } from "@/interfaces/ITodo"
import { useAuthStore } from "./authStore"

export const useTodoStore = defineStore("todoStore", () => {
  const todoList: Reactive<Todo[]> = reactive([])
  const authStore = useAuthStore()

  async function getData(userId: string = ""): Promise<Todo[] | null> {
    try {
      if (userId) {
        const dbTodos: Todo[] = await fetch("http://localhost:3000/todos").then(
          async (res) => {
            return await res.json()
          }
        )
        return dbTodos
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  function populateTodoList(todos: Todo[]): void {
    if (todoList.length > 0) {
      todoList.splice(0, todoList.length)
    }
    todos.forEach((todo) => {
      todoList.push(todo)
    })
  }

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
        todoList.push(newTodo)
        return true
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }

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
        return true
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }

  async function deleteTodo(todoId: string): Promise<boolean> {
    try {
      if (
        await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: "DELETE",
        })
      ) {
        const index = todoList.findIndex((todo) => todo.id === todoId)
        todoList.splice(index, 1)
        return true
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }

  return {
    todoList,
    getData,
    populateTodoList,
    createTodo,
    updateTodoState,
    deleteTodo,
  }
})
