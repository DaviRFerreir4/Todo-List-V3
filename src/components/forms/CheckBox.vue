<template>
  <!-- Container -->
  <div class="flex align-center gap-0.75">
    <!-- Container do input -->
    <div class="grid">
      <!-- Input checkbox -->
      <input
        type="checkbox"
        :name="props.inputName"
        :id="props.inputId"
        v-model="inputValue"
        @change="$emit('recoverValue', inputValue)"
        class="grid-stack"
      />
      <!-- Svg (Icone de check) -->
      <svg
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="grid-stack"
      >
        <path
          d="M11.3333 0.5L3.99996 7.83333L0.666626 4.5"
          stroke="#25273C"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <!-- Label -->
    <label :for="props.inputId">{{ props.labelText }}</label>
  </div>
</template>

<script setup lang="ts">
// Importações do vue
import { ref } from "vue"

// Importações de tipos
import type { Ref } from "vue"

// Recebendo props do elemento pai
const props = defineProps<{
  inputId: string
  inputName: string
  labelText: string
}>()

// Definindo a variável referente ao valor do input e emit caso o valor mude
const inputValue: Ref<boolean> = ref(false)
const emits = defineEmits(["recoverValue"])
</script>

<style scoped>
input[type="checkbox"] {
  all: unset;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.25rem;
  grid-row: 1/2;
  grid-column: 1/2;

  background-color: var(--bg-color);

  transition: background 0.2s, backgroud-color 0.2s, border-color 0.35s;

  &:checked {
    background-color: var(--todo-font-color);
  }

  &:checked + svg {
    opacity: 1;
  }
}

svg {
  opacity: 0;

  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 1;
  align-self: center;
  justify-self: center;

  pointer-events: none;

  transition: opacity 0.2s;

  path {
    stroke: var(--todo-bg-color);

    transition: stroke 0.35s;
  }
}

label {
  font: var(--font-xs);

  transition: color 0.35s;
}
</style>
