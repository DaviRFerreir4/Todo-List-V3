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
async function executeFeature() {
  if (props.feature) {
    // Se houver uma feature, prossegue
    if (props.feature !== "clear") {
      // Se a feature não for "clear", executa o que elas fariam
      todoStore.features(props.feature)
    } else {
      if (
        window.confirm("Do you realy want to delete all the completed todos?")
      ) {
        // Se a feature for "clear", pede confirmação para prosseguir
        if (await todoStore.features(props.feature)) {
          // Se prosseguir e a operação foi concluída, mostra uma mensagem de conclusão
          alert("Operation completed with success")
        } else {
          // Se prosseguir e a operação não for concluída, mostra uma mensagem de erro
          alert(
            "Something went wrong during this operation\nPlease, try again later"
          )
        }
      } else {
        // Se a operação for cancelada, mostra uma mensagem de cancelamento
        alert("Operation canceled")
      }
    }
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
