<template>
  <main class="container-child grid justify-center align-center">
    <form class="grid gap-1" @submit.prevent="">
      <TextInputs
        input-id="todo"
        input-name="todo"
        input-placeholder="Insert your todo"
        input-required
        input-type="text"
        label-text="Todo"
      ></TextInputs>
      <Select
        input-id="todo-type"
        input-name="todo-type"
        label-text="Todo type"
        :options="[
          { optionValue: 'tasks', optionText: 'Tasks' },
          { optionValue: 'studies', optionText: 'Studies' },
          { optionValue: 'hobbies', optionText: 'Hobbies' },
        ]"
        required
      ></Select>
      <TextInputs
        input-id="todo-description"
        input-name="todo-description"
        input-placeholder="Insert your todos description"
        input-required
        input-type="textarea"
        label-text="Todo"
      ></TextInputs>
      <Button button-text="Create"></Button>
    </form>
  </main>
</template>

<script setup lang="ts">
// Importação de componentes
import TextInputs from "@/components/forms/TextInputs.vue"
import Select from "@/components/forms/Select.vue"
import Button from "@/components/forms/Button.vue"
</script>

<style scoped>
.container-child {
  grid-area: main;
}

main {
  margin: 3.125rem 5rem;
  padding: 1rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  & > div {
    h1 {
      font: var(--font-xl);
      text-transform: uppercase;
    }
  }
}
</style>
