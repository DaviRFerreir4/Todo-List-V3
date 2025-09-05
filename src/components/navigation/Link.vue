<template>
  <!-- Link -->
  <router-link class="grid gap-0.5" :to="link" v-if="link">
    <!-- Título -->
    <h3>{{ props.title }}</h3>
    <!-- Subtitulo -->
    <span>{{ props.subtitle }}</span>
  </router-link>
</template>

<script setup lang="ts">
// Recebendo props do elemento pai
const props = defineProps({
  title: String,
  subtitle: String,
  link: Object,
})
</script>

<style scoped>
h3 {
  font: var(--font-md);
}

span {
  font: var(--font-sm);
  color: var(--font-color);
}
</style>
