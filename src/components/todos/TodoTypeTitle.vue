<template>
  <!-- Container do título dos todos -->
  <div
    class="flex gap-1 align-center"
    :class="
      (props.first ? 'first-title' : '') || (props.last ? 'last-title' : '')
    "
    @click="toggleDropTodo"
  >
    <!-- Icones do título dos todos (condicional baseado no tipo de todos) -->
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      v-if="props.todoType === 'tasks'"
    >
      <path
        d="M14.6 24.0001L22.1333 16.4667L20.2 14.5334L14.5667 20.1667L11.7667 17.3667L9.86668 19.2667L14.6 24.0001ZM8.00001 29.3334C7.26668 29.3334 6.6389 29.0723 6.11668 28.5501C5.59445 28.0279 5.33334 27.4001 5.33334 26.6667V5.33341C5.33334 4.60008 5.59445 3.9723 6.11668 3.45008C6.6389 2.92786 7.26668 2.66675 8.00001 2.66675H18.6667L26.6667 10.6667V26.6667C26.6667 27.4001 26.4056 28.0279 25.8833 28.5501C25.3611 29.0723 24.7333 29.3334 24 29.3334H8.00001ZM17.3333 12.0001V5.33341H8.00001V26.6667H24V12.0001H17.3333Z"
        fill="var(--todo-font-color)"
      />
    </svg>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      v-if="props.todoType === 'studies'"
    >
      <path
        d="M10 29.3334C8.71112 29.3334 7.61112 28.8779 6.70001 27.9667C5.7889 27.0556 5.33334 25.9556 5.33334 24.6667V7.33341C5.33334 6.04453 5.7889 4.94453 6.70001 4.03341C7.61112 3.1223 8.71112 2.66675 10 2.66675H26.6667V22.6667C26.1111 22.6667 25.6389 22.8612 25.25 23.2501C24.8611 23.639 24.6667 24.1112 24.6667 24.6667C24.6667 25.2223 24.8611 25.6945 25.25 26.0834C25.6389 26.4723 26.1111 26.6667 26.6667 26.6667V29.3334H10ZM8.00001 20.4334C8.31112 20.2779 8.63334 20.1667 8.96668 20.1001C9.30001 20.0334 9.64445 20.0001 10 20.0001H10.6667V5.33341H10C9.44445 5.33341 8.97223 5.52786 8.58334 5.91675C8.19445 6.30564 8.00001 6.77786 8.00001 7.33341V20.4334ZM13.3333 20.0001H24V5.33341H13.3333V20.0001ZM10 26.6667H22.4333C22.3 26.3556 22.1945 26.039 22.1167 25.7167C22.0389 25.3945 22 25.0445 22 24.6667C22 24.3112 22.0333 23.9667 22.1 23.6334C22.1667 23.3001 22.2778 22.9779 22.4333 22.6667H10C9.42223 22.6667 8.94445 22.8612 8.56668 23.2501C8.1889 23.639 8.00001 24.1112 8.00001 24.6667C8.00001 25.2445 8.1889 25.7223 8.56668 26.1001C8.94445 26.4779 9.42223 26.6667 10 26.6667Z"
        fill="var(--todo-font-color)"
      />
    </svg>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      v-if="props.todoType === 'hobbies'"
    >
      <path
        d="M16 15.9999C16 13.9777 16.7167 12.2499 18.15 10.8166C19.5833 9.38325 21.3111 8.66659 23.3333 8.66659C25.3556 8.66659 27.0833 9.38325 28.5167 10.8166C29.95 12.2499 30.6667 13.9777 30.6667 15.9999H16ZM8.66668 23.3333C6.64445 23.3333 4.91668 22.6166 3.48334 21.1833C2.05001 19.7499 1.33334 18.0221 1.33334 15.9999H16C16 18.0221 15.2833 19.7499 13.85 21.1833C12.4167 22.6166 10.6889 23.3333 8.66668 23.3333ZM16 15.9999C13.9778 15.9999 12.25 15.2833 10.8167 13.8499C9.38334 12.4166 8.66668 10.6888 8.66668 8.66659C8.66668 6.64436 9.38334 4.91659 10.8167 3.48325C12.25 2.04992 13.9778 1.33325 16 1.33325V15.9999ZM16 30.6666V15.9999C18.0222 15.9999 19.75 16.7166 21.1833 18.1499C22.6167 19.5833 23.3333 21.311 23.3333 23.3333C23.3333 25.3555 22.6167 27.0833 21.1833 28.5166C19.75 29.9499 18.0222 30.6666 16 30.6666Z"
        fill="var(--todo-font-color)"
      />
    </svg>
    <!-- Título dos todos -->
    <span>{{ props.title }}</span>
    <!-- Icone do dropdown -->
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="margin-left-auto"
      :class="showTodos ? 'show-todos' : ''"
    >
      <path
        d="M8 12L16 20L24 12"
        stroke="var(--todo-font-color)"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// Importações do vue
import { ref } from "vue"

// Importação de tipos
import type { Ref } from "vue"
import type { TodoType } from "@/types/TodoType"

// Recebendo props do elemento pai
const props = defineProps<{
  todoType: TodoType
  title: string
  first?: boolean
  last?: boolean
}>()

// Varíavel de controle de dropdown dos todos
const showTodos: Ref<boolean> = ref(false)

// Emit para retornar o valor (se está dropado ou não) para o elemento pai
const emits = defineEmits<{
  showTodosEmit: [TodoType]
}>()

// Função rodada toda vez que dropdown é clicado
function toggleDropTodo() {
  // Troca o valor boleano da varíavel de controle do dropdown e emite esse valor
  showTodos.value = !showTodos.value
  emits("showTodosEmit", props.todoType)
}
</script>

<style scoped>
div {
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--todo-border-color);

  font: var(--font-lg);
  cursor: default;

  transition: border-color 0.35s;

  svg:last-child {
    cursor: pointer;

    transition: transform 0.2s;
  }

  .show-todos {
    transform: rotate(-180deg);
  }

  &.first-title {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &.last-title {
    border-bottom-width: 1.5px;

    &:has(.show-todos) {
      border-bottom-width: 1px;
    }
  }

  path {
    transition: fill 0.35s;
  }
}
</style>
