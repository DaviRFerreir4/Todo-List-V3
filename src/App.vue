<template>
  <!-- Container global (grid é alterado quando o usuário loga) -->
  <div
    class="container grid"
    :class="
      (authStore.isLoggedIn ? 'user-logged-in' : '') ||
      (router.currentRoute.value.name === 'no-access' ? 'no-access' : '')
    "
  >
    <!-- Header só é mostrado quando usuário está logado -->
    <Header
      v-if="
        authStore.isLoggedIn || router.currentRoute.value.name === 'no-access'
      "
    ></Header>
    <!-- SidebarNav só é mostrada quando usuário está logado -->
    <SidebarNav v-if="authStore.isLoggedIn"></SidebarNav>
    <!-- Rota da aplicação -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Importações de componentes
import Header from "@/components/navigation/Header.vue"
import SidebarNav from "@/components/navigation/SidebarNav.vue"

// Importações do vue
import { onBeforeMount } from "vue"

// Importação de pacotes
import { useRouter } from "vue-router"

// Importação da store de autenticação
import { useAuthStore } from "./stores/authStore"

// Declaração da store de autenticação e da variavel de controle de rota
const router = useRouter()
const authStore = useAuthStore()

console.log(authStore.isLoggedIn)

// Método para retirar transições da página antes de carregamento dela (pra se caso o usuário estiver no modo escuro não ter transição quando ele entrar no app novamente)
onBeforeMount(() => {
  if (localStorage.getItem("mode") === "dark") {
    // Se o modo do localStorage for "dark", recupera todos elementos da página e retira as transições deles com a classe "no-transition"
    const allElements: NodeListOf<Element> = document.querySelectorAll("*")
    allElements.forEach((element) => {
      element.classList.toggle("no-transition")
    })
    // Seleciona o body e adiciona a classe "dark-mode" nele
    const body: HTMLBodyElement | null = document.querySelector("body")
    body ? body.classList.add("dark-mode") : ""
    setTimeout(() => {
      // Depois de 1 segundo, retira a classe de "no-transition" dos elementos para que eles tenham transições novamente
      allElements.forEach((element) => {
        element.classList.toggle("no-transition")
      })
    }, 1000)
  }
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  grid-template-columns: clamp(12rem, 25%, 30rem) 1fr;
  grid-template-rows: clamp(5rem, 8.5vh, 6rem) 1fr;
}

.user-logged-in {
  grid-template-areas:
    "header header"
    "aside main";
}

.no-access {
  grid-template-areas:
    "header header"
    "main main";
}
</style>
