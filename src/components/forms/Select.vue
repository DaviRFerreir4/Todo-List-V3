<template>
  <div class="grid gap-0.5">
    <!-- Label -->
    <label :for="props.inputId">{{ props.labelText }}</label>
    <select
      :name="props.inputName"
      :id="props.inputId"
      :class="!selectValue ? 'empty' : ''"
      v-model="selectValue"
      @change="$emit('recoverValue', selectValue)"
      :required="props.required"
    >
      <option value="" disabled hidden selected>Choose:</option>
      <option
        :value="option.optionValue"
        v-for="option in props.options"
        :key="option.optionValue"
      >
        {{ option.optionText }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
// Importações do vue
import { ref } from "vue"

// Importações de tipos
import type { Ref } from "vue"
import type { TodoType } from "@/types/TodoType"
import type { SelectOptions } from "@/types/SelectOptions"

// Recebendo props do elemento pai
const props = defineProps<{
  inputName: string
  inputId: string
  labelText: string
  required?: boolean
  options: SelectOptions[]
}>()

// Definindo a variável referente ao valor do input e emit caso o valor mude
const selectValue: Ref<TodoType> = ref("")
const emits = defineEmits<{
  recoverValue: [TodoType]
}>()
</script>

<style scoped>
select {
  padding: 0.75rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  &,
  ::picker(select) {
    appearance: base-select;
  }

  option {
    color: var(--todo-font-color);
  }

  &.empty {
    color: var(--font-color);
  }
}
</style>
