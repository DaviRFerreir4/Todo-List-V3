<template>
  <!-- Link -->
  <router-link class="grid gap-0.5" :to="link" v-if="link">
    <!-- Título -->
    <h3>{{ props.title }}</h3>
    <!-- Subtitulo -->
    <span>{{ props.subtitle }}</span>
  </router-link>
  <!-- Link caso a prop de link não seja passada (para o caso de uma feature) -->
  <a
    @click="executeFeature"
    :class="props.feature === todoStore.showTodoAvaiability ? 'choosed' : ''"
    v-else-if="props.feature"
  >
    <!-- Título -->
    <h3>{{ props.title }}</h3>
    <!-- Subtitulo -->
    <span>{{ props.subtitle }}</span>
  </a>
</template>

<script setup lang="ts">
// Importando a store de todos
import { useTodoStore } from "@/stores/todoStore"

// Importando tipos
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"
import type { Features } from "@/types/Features"

// Declarando a store de todos
const todoStore = useTodoStore()

// Recebendo props do elemento pai
const props = defineProps<{
  title: string
  subtitle: string
  link?: Pick<RouteLocationNormalizedLoadedGeneric, "name">
  feature?: Features
}>()

// Função de click das features
function executeFeature() {
  if (props.feature) {
    todoStore.features(props.feature)
  }
}
</script>

<style scoped>
a {
  padding-left: 0.5rem;

  cursor: pointer;

  transition: border 0.35s;

  h3 {
    font: var(--font-md);
  }

  span {
    font: var(--font-sm);
    color: var(--font-color);
  }

  &.choosed {
    border-left: 4px solid var(--link);
  }
}
</style>
