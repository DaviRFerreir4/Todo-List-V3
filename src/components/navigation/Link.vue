<template>
  <!-- Link -->
  <router-link class="grid gap-0.5" :to="link" v-if="link">
    <!-- Título -->
    <h3>{{ props.title }}</h3>
    <!-- Subtitulo -->
    <span>{{ props.subtitle }}</span>
  </router-link>
  <a
    @click="defineFeature"
    :class="props.feature === todoStore.showTodoAvaiability ? 'choosed' : ''"
    v-else
  >
    <!-- Título -->
    <h3>{{ props.title }}</h3>
    <!-- Subtitulo -->
    <span>{{ props.subtitle }}</span>
  </a>
</template>

<script setup lang="ts">
// Importando tipos
import { useTodoStore } from "@/stores/todoStore"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"
import Todos from "../todos/Todos.vue"

const todoStore = useTodoStore()

// Recebendo props do elemento pai
const props = defineProps<{
  title: string
  subtitle: string
  link?: Pick<RouteLocationNormalizedLoadedGeneric, "name">
  feature?: string
}>()

function defineFeature() {
  if (props.feature) {
    if (props.feature !== "clear") {
      todoStore.showTodoAvaiability = props.feature
      localStorage.setItem("showTodoAvaiability", props.feature)
    } else {
      const todosToDelete = todoStore.todoList.filter((todo) => todo.isChecked)
      todosToDelete.forEach((todo) => {
        todoStore.deleteTodo(todo.id)
      })
    }
  }
  console.log(todoStore.showTodoAvaiability)
}
</script>

<style scoped>
h3 {
  font: var(--font-md);
}

span {
  font: var(--font-sm);
  color: var(--font-color);
}

a {
  cursor: pointer;
  padding-left: 0.5rem;
}

.choosed {
  border-left: 4px solid var(--link);
}
</style>
