<template>
  <main class="container-child grid justify-center align-center">
    <div>Todo List</div>
  </main>
</template>

<script setup lang="ts"></script>

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
