<template>
  <div class="container grid">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

onBeforeMount(() => {
  if (localStorage.getItem("mode") === "dark") {
    document.querySelector("body")?.classList.add("dark-mode")
  }
})
</script>

<style scoped>
.container {
  max-width: 80rem;
  height: 100vh;
}
</style>
