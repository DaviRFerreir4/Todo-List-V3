<template>
  <!-- Container principal da página -->
  <main>
    <!-- For que gera todas as listas de todos -->
    <div v-for="todoType in todoTypes">
      <!-- Título da lista de todo -->
      <TodoTypeTitle
        :todo-type="todoType.type"
        :title="todoType.title"
        :first="
          todoTypes.findIndex((todo) => todo.type === todoType.type) === 0
            ? true
            : false
        "
        :last="
          todoTypes.findIndex((todo) => todo.type === todoType.type) ===
          todoTypes.length - 1
            ? true
            : false
        "
        @show-todos-emit="todoStore.toggleShowTodoType(todoType.type)"
        class="todo-title"
      ></TodoTypeTitle>
      <!-- Container da lista de todos -->
      <div
        class="todos grid"
        :class="
          todoStore.showTodoTypes.find(
            (todoTitle) => todoTitle === todoType.type
          )
            ? 'show-todos'
            : ''
        "
      >
        <ul>
          <!-- Item da lista de todos da todostore vinda do servidor e manipulada pelo usuário, passando por filtragens de todoAvaiability e todoType -->
          <li
            v-for="todo in checkTodoAvaiability(todoStore.todoList).filter(
              (todo) => todo.todoType === todoType.type
            )"
            :key="todo.id"
          >
            <!-- Todo personalizado com os dados da array filtrada -->
            <Todos
              :todo-description="todo.todoDescription"
              :todo-id="todo.id"
              :todo-is-checked="todo.isChecked"
              :todo-text="todo.todoText"
            ></Todos>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// Importação de componentes
import Todos from "@/components/todos/Todos.vue"
import TodoTypeTitle from "@/components/todos/TodoTypeTitle.vue"

// Importação da store de todos
import { useTodoStore } from "@/stores/todoStore"

// Importação de tipos
import type { Todo } from "@/interfaces/ITodo"
import type { TodoType } from "@/types/TodoType"

// Declaração da store de todos
const todoStore = useTodoStore()

// Declaração da array que controla as listas de todos
const todoTypes = [
  {
    type: <TodoType>"tasks",
    title: "Tasks",
  },
  {
    type: <TodoType>"studies",
    title: "Studies",
  },
  {
    type: <TodoType>"hobbies",
    title: "Hobbies",
  },
]

// Filtra a lista de todos baseado na todoAvaiability
function checkTodoAvaiability(todos: Todo[]): Todo[] {
  switch (todoStore.showTodoAvaiability) {
    case "completed":
      // Caso a todoAvaiabilty seja "completed", retorna somente todos checados
      return todos.filter((todo) => todo.isChecked)
      break
    case "active":
      // Caso a todoAvaiabilty seja "active", retorna somente todos não checados
      return todos.filter((todo) => !todo.isChecked)
      break
  }
  // Em nenhum caso, retorna a lista completa de todos
  return todos
}
</script>

<style scoped>
main {
  grid-area: main;
  margin: 3.125rem 5rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;
  overflow: auto;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  .todos {
    grid-template-rows: 0fr;
    border: 0px solid var(--todo-border-color);

    transition-property: grid-template-rows, border-color, border-width;
    transition-duration: 0.35s;

    & > ul {
      overflow: hidden;

      li {
        border-bottom: 1px solid var(--todo-border-color);

        transition: border-color 0.35s;
      }
    }
  }

  .show-todos {
    grid-template-rows: 1fr;
  }
}
</style>
