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
// Importando tipos
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

// Recebendo props do elemento pai
const props = defineProps<{
  title: string
  subtitle: string
  link: Pick<RouteLocationNormalizedLoadedGeneric, "name">
}>()
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
