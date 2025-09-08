<template>
  <!-- Botão -->
  <button>{{ props.buttonText }}</button>
</template>

<script setup lang="ts">
// Recebendo props do elemento pai
const props = defineProps<{
  buttonText: string
}>()
</script>

<style scoped>
button {
  all: unset;
  padding-block: 0.75rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;
  text-align: center;

  background-color: var(--todo-font-color);
  color: var(--todo-bg-color);

  transition: background-color, border-color, color;
  transition-duration: 0.35s;
}
</style>
