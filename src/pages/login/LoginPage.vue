<template>
  <!-- Container principal da página -->
  <main class="grid gap-2">
    <!-- Icone de modo -->
    <img
      :src="toggleIcon(mode)"
      alt="Dark mode icon"
      id="alternate-modes"
      @click="mode = toggleMode()"
    />
    <!-- Logo do App -->
    <img :src="toggleLogo(mode)" alt="Logo" />
    <form action="" class="grid gap-1" @submit.prevent="login">
      <!-- Input de login -->
      <TextInputs
        input-id="loginId"
        input-name="loginId"
        input-placeholder="Ex1000123"
        input-type="text"
        :input-required="true"
        label-text="Login"
        @recover-value="inputLogin = $event"
      ></TextInputs>
      <!-- Input de senha -->
      <TextInputs
        input-id="loginPass"
        input-name="loginPass"
        input-placeholder="Password123."
        input-type="password"
        :input-required="true"
        label-text="Password"
        @recover-value="inputPassword = $event"
      ></TextInputs>
      <!-- Input de permanecer conectado -->
      <CheckBox
        input-id="rememberUser"
        input-name="rememberUser"
        label-text="Remember me"
        @recover-value="rememberUser = $event"
      ></CheckBox>
      <!-- Botão de submit das informações do formulário -->
      <Button button-text="Sign In"></Button>
    </form>
  </main>
</template>

<script setup lang="ts">
// Importação de componentes
import CheckBox from "@/components/forms/CheckBox.vue"
import Button from "@/components/forms/Button.vue"
import TextInputs from "@/components/forms/TextInputs.vue"

// Importações locais (composables e stores)
import { toggleMode, toggleLogo, toggleIcon } from "@/composables/toggleMode"
import { useAuthStore } from "@/stores/authStore"

// Importações do vue
import { ref } from "vue"

// Importações de pactoes
import { useRouter } from "vue-router"

// Importação de tipos
import type { Ref } from "vue"
import type { User } from "@/interfaces/IUser"
import type { Router } from "vue-router"

// Recuperando o modo do localStorage
const mode: Ref<null | string> = ref(localStorage.getItem("mode"))

// Recuperando os dados do formulário
let inputLogin: Ref<string> = ref("")
let inputPassword: Ref<string> = ref("")
let rememberUser: Ref<boolean> = ref(false)

// Store e router declarados
const authStore = useAuthStore()
const router: Router = useRouter()

// Função para login
async function login(): Promise<void> {
  // Recupera os dados da API
  const users: User[] | null = await authStore.getUsers()
  if (users) {
    // Se houver dados recuperados, filtra eles com o login do formulário
    const [userFiltered] = users.filter(
      (user) => user.login === inputLogin.value
    )
    if (userFiltered) {
      // Se há um dado com o login batendo, checa a senha
      const { password, ...userNoPass } = userFiltered
      if (password == inputPassword.value) {
        // Se a senha está correta, continua os processos de login normalmente
        authStore.login(userNoPass, rememberUser.value)
        alert("Logged in successfully!")
        router.push({ name: "todo-creation" })
      } else {
        // Se a senha está incorreta, barra o login
        alert("Your password is wrong")
      }
    } else {
      // Se não há dados da API que batam com o login, barra o login
      alert("This login doesn't exist.\nPlease, try again")
    }
  } else {
    // Se não conseguiu recuperar dados da API, barra o login
    alert(
      "There has been an error trying to recover your user from the database.\nPlease, try again later."
    )
  }
}
</script>

<style scoped>
main {
  grid-column: 1/3;
  grid-row: 1/3;
  justify-items: center;
  position: relative;
  margin: auto;
  padding: 1.5rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);

  transition: background-color, border-color;
  transition-duration: 0.35s;

  img#alternate-modes {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
