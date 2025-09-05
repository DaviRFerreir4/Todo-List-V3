<template>
  <div class="grid gap-0.5">
    <label :for="props.inputId">{{ props.labelText }}</label>
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
import { ref, type Ref } from "vue"

const props = defineProps({
  inputType: { type: String, required: true },
  inputName: { type: String, required: true },
  inputId: { type: String, required: true },
  inputPlaceholder: { type: String, required: true },
  inputRequired: Boolean,
  labelText: { type: String, required: true },
})

const inputValue: Ref = ref("")
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
