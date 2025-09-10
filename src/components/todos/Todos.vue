<template>
  <!-- Container do todo -->
  <div class="todo-wrapper flex gap-1 align-center">
    <!-- Container do input checkbox -->
    <div class="grid align-center">
      <!-- Input checkbox -->
      <input
        type="checkbox"
        :name="props.todoId"
        :id="props.todoId"
        :value="props.todoIsChecked"
        @change="updateTodoState(checkboxValue)"
        v-model="checkboxValue"
      />
      <!-- Icone de check -->
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="grid-stack"
      >
        <path
          d="M1.36365 6.21678L5.04001 10.111L13.2218 1.44434"
          stroke="var(--todo-border-color)"
          stroke-width="2"
        />
      </svg>
    </div>
    <!-- Container dos textos do todo -->
    <div class="grid">
      <!-- Texto do todo -->
      <span>{{ props.todoText }}</span>
      <!-- Descrição do todo -->
      <span>{{ props.todoDescription }}</span>
    </div>
    <!-- Icone de deletar todo -->
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      class="margin-left-auto"
      @click="deleteTodo(props.todoId)"
    >
      <path
        d="M15.0844 0L15.7138 0.628444L8.48533 7.85778L15.7138 15.0862L15.0853 15.7147L7.85689 8.48622L0.628444 15.7147L0 15.0844L7.22844 7.856L0 0.628444L0.628444 0L7.85778 7.22844L15.0853 0H15.0844Z"
        fill="var(--todo-font-color)"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// Importações do vue
import { ref } from "vue"

// Importação da store de todo
import { useTodoStore } from "@/stores/todoStore"

// Importação de tipos
import type { Ref } from "vue"

// Declaração da store de todos
const todoStore = useTodoStore()

// Recebendo props do elemento pai
const props = defineProps<{
  todoId: string
  todoText: string
  todoDescription: string
  todoIsChecked: boolean
}>()

// Varíavel para caputrar o valor do input checkbox
const checkboxValue: Ref<boolean> = ref(props.todoIsChecked)

// Função para alterar o estado do todo
async function updateTodoState(value: boolean) {
  if (!todoStore.updateTodoState(props.todoId, value)) {
    // Se a operação de alterar o estado do todo foi uma falha, mostra um alerta de falha
    alert(
      "It wans't possible to update the todo state in the database\nPlease, try again later"
    )
  }
}

// Função para deletar todos
async function deleteTodo(todoId: string) {
  if (window.confirm("Do you realy want to remove this todo from your list?")) {
    // Mostra uma tela de confirmação para o usuário e se ele confirmar, continua com a operação
    if (await todoStore.deleteTodo(todoId)) {
      // Se a operação de deletar foi um sucesso, mostra um alerta sucesso
      alert("Operation completed")
    } else {
      // Se a operação foi falha, mostra um alerta de falha
      alert("Unexpected error during the operation\nPlease, try again later")
    }
  } else {
    // Se usuário decide cancelar a operação, mostra um alerta de cancelamento
    alert("Operation canceled")
  }
}
</script>

<style scoped>
.todo-wrapper {
  padding: 0.5rem 1.5rem;

  input[type="checkbox"] {
    all: unset;
    width: 1.5rem;
    height: 1.5rem;
    grid-column: 1/2;
    grid-row: 1/2;
    border: 1px solid var(--todo-border-color);
    border-radius: 50%;

    background-color: var(--bg-color);

    transition-property: background-color, border-color;
    transition-duration: 0.35s;

    &:checked {
      background-color: var(--link);

      & + svg {
        opacity: 1;
      }
    }
  }

  & > div {
    &:nth-child(1) {
      svg {
        opacity: 0;

        justify-self: center;
        z-index: 1;

        pointer-events: none;

        transition: opacity 0.35s;
      }
    }

    &:nth-child(2) {
      gap: 0.25rem;

      span:nth-child(2) {
        font: var(--font-sm);
        color: var(--font-color);
      }
    }
  }

  & > svg {
    margin-right: 0.5rem;

    cursor: pointer;
  }
}

path {
  transition: fill 0.35s, stroke 0.35s;
}
</style>
