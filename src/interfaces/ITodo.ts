import type { TodoType } from "@/types/TodoType"

export interface Todo {
  id: string
  userId: string
  todoText: string
  todoType: TodoType
  todoDescription: string
  isChecked: boolean
}
