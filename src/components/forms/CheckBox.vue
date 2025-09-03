<template>
  <div class="flex align-center gap-0.75">
    <input
      type="checkbox"
      :name="props.inputName"
      :id="props.inputId"
      v-model="inputValue"
      @change="$emit('recoverValue', inputValue)"
    />
    <label :for="props.inputId">{{ props.labelText }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
  inputId: String,
  inputName: String,
  labelText: String,
})

const inputValue = ref(false)
const emits = defineEmits(["recoverValue"])
</script>

<style scoped>
input[type="checkbox"] {
  all: unset;
  position: relative;
  width: 1rem;
  height: 1rem;
  background-color: var(--bg-color);
  border-radius: 0.25rem;
  border: 1px solid var(--todo-border-color);
  transition: background 0.2s, backgroud-color 0.2s;

  &:checked {
    background-color: var(--todo-font-color);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: no-repeat center/80% url(../../assets/icons/Icon.svg);
    }
  }
}

label {
  font: var(--font-xs);
}
</style>
