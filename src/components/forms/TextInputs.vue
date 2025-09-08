<template>
  <!-- Container -->
  <div class="grid gap-0.5">
    <!-- Label -->
    <label :for="props.inputId">{{ props.labelText }}</label>
    <!-- Input text e password caso requerido (v-if) -->
    <input
      :type="props.inputType"
      :name="props.inputName"
      :id="props.inputId"
      :placeholder="props.inputPlaceholder"
      :required="props.inputRequired"
      v-model.lazy="inputValue"
      v-if="props.inputType === 'text' || props.inputType === 'password'"
      @change="$emit('recoverValue', inputValue)"
    />
    <!-- Textarea caso requerida (v-if) -->
    <textarea
      :name="props.inputName"
      :id="props.inputId"
      :placeholder="props.inputPlaceholder"
      rows="4"
      :required="props.inputRequired"
      v-model.lazy="inputValue"
      v-if="props.inputType === 'textarea'"
      @change="$emit('recoverValue', inputValue)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
// Importações do vue
import { ref } from "vue"

// Importações de tipos
import type { Ref } from "vue"

// Recebendo props do elemento pai
const props = defineProps<{
  inputType: string
  inputName: string
  inputId: string
  inputPlaceholder: string
  inputRequired?: boolean
  labelText: string
}>()

// Definindo a variável referente ao valor do input e emit caso o valor mude
const inputValue: Ref<string> = ref("")
const emits = defineEmits(["recoverValue"])
</script>

<style scoped>
input[type="text"],
input[type="password"],
textarea {
  all: unset;
  padding: 0.75rem 1rem;
  width: 17rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--bg-color);

  transition: background-color, border-color, color;
  transition-duration: 0.35s;

  &::placeholder {
    color: var(--font-color);
    font: inherit;
  }
}

textarea {
  resize: none;
  overflow-wrap: break-word;
}
</style>
