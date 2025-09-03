<template>
  <main class="grid gap-2">
    <img
      src="../../assets/icons/icon-sun.svg"
      alt="Dark mode icon"
      id="alternate-modes"
    />
    <img src="../../assets/todo-logo-light.svg" alt="Logo" />
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

  img#alternate-modes {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
