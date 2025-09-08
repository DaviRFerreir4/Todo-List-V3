<template>
  <main class="container-child grid justify-center align-center">
    <div>
      <ul class="grid gap-1.5">
        <div class="grid gap-1">
          <h3>Tasks</h3>
          <li
            v-for="todo in todoStore.todoList.filter(
              (todo) => todo.todoType === 'tasks'
            )"
          >
            {{ todo.todoText }} is {{ todo.isChecked }}
          </li>
        </div>
        <div class="grid gap-1">
          <h3>Studies</h3>
          <li
            v-for="todo in todoStore.todoList.filter(
              (todo) => todo.todoType === 'studies'
            )"
          >
            {{ todo.todoText }} is {{ todo.isChecked }}
          </li>
        </div>
        <div class="grid gap-1">
          <h3>Hobbies</h3>
          <li
            v-for="todo in todoStore.todoList.filter(
              (todo) => todo.todoType === 'hobbies'
            )"
          >
            {{ todo.todoText }} is {{ todo.isChecked }}
          </li>
        </div>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore"

const todoStore = useTodoStore()
</script>

<style scoped>
.container-child {
  grid-area: main;
}

main {
  margin: 3.125rem 5rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);
}
</style>
