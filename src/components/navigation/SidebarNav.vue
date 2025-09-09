<template>
  <!-- Aside (elemento principal da sidebar) -->
  <aside>
    <!-- Título -->
    <h2>Navigation</h2>
    <!-- Quebra temática -->
    <hr noshade />
    <!-- Container dos links -->
    <div class="grid gap-2">
      <!-- Link para rota "todo-creation" -->
      <Link
        title="Create todos"
        subtitle="Organize your tasks in diferent todos"
        :link="{ name: 'todo-creation' }"
      ></Link>
      <!-- Link para rota "todo-list" -->
      <Link
        title="List todos"
        subtitle="See all the tasks you have created"
        :link="{ name: 'todo-list' }"
      ></Link>
      <!-- Features da rota "todo-list" -->
      <div class="features grid" :class="showFeatures ? 'show-features' : ''">
        <div class="grid gap-2">
          <!-- Link para mostrar todos os todos -->
          <Link
            title="All"
            subtitle="List all the active and completed todos"
            :link="{ name: '' }"
          ></Link>
          <!-- Link para mostrar todos completos -->
          <Link
            title="Completed"
            subtitle="List only the completed todos"
            :link="{ name: '' }"
          ></Link>
          <!-- Link para mostrar todos ativos -->
          <Link
            title="Active"
            subtitle="List only the active todos"
            :link="{ name: '' }"
          ></Link>
          <!-- Link para limpar todos os todos -->
          <Link
            title="Clear Completed"
            subtitle="Clear all the todos you have completed"
            :link="{ name: '' }"
          ></Link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Importações de componentes
import Link from "./Link.vue"

// Importações do vue
import { ref, watch } from "vue"

// Importações de pacotes
import { useRouter } from "vue-router"

// Importações de tipos
import type { Ref } from "vue"
import type { Router } from "vue-router"

// Variáveis para controle da exibição da div de features
const showFeatures: Ref<boolean> = ref(false)
const router: Router = useRouter()

// Watch que monitora a rota

watch(router.currentRoute, () => {
  if (router.currentRoute.value.name === "todo-list") {
    // Caso a rota seja "todo-list", muda showFeatures para verdadeiro
    showFeatures.value = true
  } else if (showFeatures.value) {
    // Caso a rota seja outra e showFeatures esteja verdadeiro, muda pra falso
    showFeatures.value = false
  }
})
</script>

<style scoped>
aside {
  grid-area: aside;
  border: 1px solid var(--todo-border-color);
  padding: 1rem 1.5rem;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  h2 {
    font: var(--font-xl);
    margin-bottom: 1rem;
  }

  hr {
    background-color: var(--todo-border-color);
    border-color: var(--todo-border-color);

    transition-property: background-color, border-color;
    transition-duration: 0.35s;
  }

  & > div {
    margin-top: 1.25rem;

    .features {
      grid-template-rows: 0fr;
      margin-left: 2rem;

      transition: 300ms ease-in-out;

      & > div {
        overflow: hidden;
      }
    }

    .show-features {
      grid-template-rows: 1fr;
    }
  }
}
</style>
