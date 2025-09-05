<template>
  <header class="flex justify-between align-center">
    <!-- Logo cortado -->
    <img :src="toggleLogo(mode, true)" alt="Logo" />
    <!-- Lado direito do Header -->
    <div class="flex align-center gap-2">
      <!-- Icone de troca de modo -->
      <img
        :src="toggleIcon(mode)"
        alt="Change mode icon"
        id="mode-icon"
        @click="mode = toggleMode()"
      />
      <!-- Span de usuário -->
      <span>Hello, {{ authStore.user.username?.name }}</span>
      <!-- Span de logout -->
      <span @click="authStore.logout(true)">Logout</span>
    </div>
  </header>
</template>

<script setup lang="ts">
// Importações locais (composables e stores)
import { toggleIcon, toggleLogo, toggleMode } from "@/composables/toggleMode"
import { useAuthStore } from "@/stores/authStore"

// Importações do vue
import { ref } from "vue"

// Importações de tipos
import type { Ref } from "vue"

const authStore = useAuthStore()

const mode: Ref<string | null> = ref(localStorage.getItem("mode"))
</script>

<style scoped>
header {
  grid-area: header;
  padding: 1.25rem 2.5rem;
  border: 1px solid var(--todo-border-color);

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  #mode-icon {
    width: 2rem;
    height: 2rem;
  }

  span:nth-child(3) {
    color: var(--danger);
    cursor: pointer;
  }
}
</style>
