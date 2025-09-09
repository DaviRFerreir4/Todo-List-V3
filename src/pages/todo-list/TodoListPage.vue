<template>
  <main class="container-child">
    <TodoTypeTitle
      icon="tasks"
      title="Tasks"
      :first="true"
      @show-todos-emit="toogleTodos"
      class="todo-title"
    ></TodoTypeTitle>
    <div
      class="todos grid"
      :class="
        showTodos.find((todoTitle) => todoTitle === 'tasks') ? 'show-todos' : ''
      "
    >
      <ul>
        <li
          v-for="todo in todoStore.todoList.filter(
            (todo) => todo.todoType === 'tasks'
          )"
          :key="todo.id"
        >
          <Todos
            :todo-description="todo.todoDescription"
            :todo-id="todo.id"
            :todo-is-checked="todo.isChecked"
            :todo-text="todo.todoText"
          ></Todos>
        </li>
      </ul>
    </div>
    <TodoTypeTitle
      icon="studies"
      title="Studies"
      @show-todos-emit="toogleTodos"
      class="todo-title"
    ></TodoTypeTitle>
    <div
      class="todos grid"
      :class="
        showTodos.find((todoTitle) => todoTitle === 'studies')
          ? 'show-todos'
          : ''
      "
    >
      <ul>
        <li
          v-for="todo in todoStore.todoList.filter(
            (todo) => todo.todoType === 'studies'
          )"
          :key="todo.id"
        >
          <Todos
            :todo-description="todo.todoDescription"
            :todo-id="todo.id"
            :todo-is-checked="todo.isChecked"
            :todo-text="todo.todoText"
          ></Todos>
        </li>
      </ul>
    </div>
    <TodoTypeTitle
      icon="hobbies"
      title="Hobbies"
      :last="true"
      @show-todos-emit="toogleTodos"
      class="todo-title last"
    ></TodoTypeTitle>
    <div
      class="todos grid"
      :class="
        showTodos.find((todoTitle) => todoTitle === 'hobbies')
          ? 'show-todos'
          : ''
      "
    >
      <ul>
        <li
          v-for="todo in todoStore.todoList.filter(
            (todo) => todo.todoType === 'hobbies'
          )"
          :key="todo.id"
        >
          <Todos
            :todo-description="todo.todoDescription"
            :todo-id="todo.id"
            :todo-is-checked="todo.isChecked"
            :todo-text="todo.todoText"
          ></Todos>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import Todos from "@/components/todos/Todos.vue"
import TodoTypeTitle from "@/components/todos/TodoTypeTitle.vue"
import { useAuthStore } from "@/stores/authStore"
import { useTodoStore } from "@/stores/todoStore"
import { reactive } from "vue"

const todoStore = useTodoStore()
const authStore = useAuthStore()

const showTodos: string[] = reactive(["tasks", "studies", "hobbies"])

function toogleTodos(todoTitle: string) {
  if (!showTodos.find((todo) => todo === todoTitle)) {
    showTodos.push(todoTitle)
  } else {
    const index = showTodos.findIndex((todo) => todo === todoTitle)
    showTodos.splice(index, 1)
  }
  console.log(showTodos)
}
</script>

<style scoped>
.container-child {
  grid-area: main;
  overflow: auto;
}

main {
  margin: 3.125rem 5rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

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
