// Importação de tipos
import type { TodoType } from "@/types/TodoType"

// Interface que representa os dados recebidos de um todo do servidor
export interface Todo {
  id: string
  userId: string
  todoText: string
  todoType: TodoType
  todoDescription: string
  isChecked: boolean
}
