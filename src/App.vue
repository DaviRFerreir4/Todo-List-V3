<template>
  <div class="container grid">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

onBeforeMount(() => {
  const allElements: NodeListOf<Element> = document.querySelectorAll("*")
  const body: HTMLBodyElement | null = document.querySelector("body")
  if (localStorage.getItem("mode") === "dark") {
    allElements.forEach((element) => {
      element.classList.toggle("no-transition")
    })
    body ? body.classList.add("dark-mode") : ""
    setTimeout(() => {
      allElements.forEach((element) => {
        element.classList.toggle("no-transition")
      })
    }, 1000)
  }
})
</script>

<style scoped>
.container {
  max-width: 80rem;
  height: 100vh;
}
</style>
