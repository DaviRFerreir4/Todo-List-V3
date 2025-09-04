<template>
  <main class="grid gap-2">
    <img
      :src="toggleIcon(mode)"
      alt="Dark mode icon"
      id="alternate-modes"
      @click="mode = toggleMode()"
    />
    <img :src="toggleLogo(mode)" alt="Logo" />
    <form action="" class="grid gap-1" @submit.prevent="">
      <TextInputs
        input-id="loginId"
        input-name="loginId"
        input-placeholder="Ex1000123"
        input-type="text"
        :input-required="true"
        label-text="Login"
      ></TextInputs>
      <TextInputs
        input-id="loginPass"
        input-name="loginPass"
        input-placeholder="Password123."
        input-type="password"
        :input-required="true"
        label-text="Password"
      ></TextInputs>
      <CheckBox
        input-id="rememberUser"
        input-name="rememberUser"
        label-text="Remember me"
      ></CheckBox>
      <Button button-text="Sign In"></Button>
    </form>
  </main>
</template>

<script setup lang="ts">
import CheckBox from "@/components/forms/CheckBox.vue"
import Button from "@/components/forms/Button.vue"
import TextInputs from "@/components/forms/TextInputs.vue"
import { toggleMode, toggleLogo, toggleIcon } from "@/composables/toggleMode"
import type { Ref } from "vue"
import { ref } from "vue"

let mode: Ref = ref(localStorage.getItem("mode"))
</script>

<style scoped>
main {
  justify-items: center;
  margin: auto;
  padding: 1.5rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  position: relative;

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
