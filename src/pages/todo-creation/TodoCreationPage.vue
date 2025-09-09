<template>
  <main class="container-child grid justify-center align-center">
    <form class="grid gap-1" @submit.prevent="createTodo">
      <TextInputs
        input-id="todo"
        input-name="todo"
        input-placeholder="Insert your todo"
        input-required
        input-type="text"
        label-text="Todo"
        @recover-value="todoText = $event"
      ></TextInputs>
      <Select
        input-id="todo-type"
        input-name="todo-type"
        label-text="Todo type"
        :options="[
          { optionValue: 'tasks', optionText: 'Tasks' },
          { optionValue: 'studies', optionText: 'Studies' },
          { optionValue: 'hobbies', optionText: 'Hobbies' },
        ]"
        required
        @recover-value="todoType = $event"
      ></Select>
      <TextInputs
        input-id="todo-description"
        input-name="todo-description"
        input-placeholder="Insert your todos description"
        input-required
        input-type="textarea"
        label-text="Todo"
        @recover-value="todoDesc = $event"
      ></TextInputs>
      <Button button-text="Create"></Button>
    </form>
  </main>
</template>

<script setup lang="ts">
// Importação de componentes
import TextInputs from "@/components/forms/TextInputs.vue"
import Select from "@/components/forms/Select.vue"
import Button from "@/components/forms/Button.vue"
import { ref, type Ref } from "vue"
import { useTodoStore } from "@/stores/todoStore"
import { useAuthStore } from "@/stores/authStore"
import type { Todo } from "@/interfaces/ITodo"
import type { TodoType } from "@/types/TodoType"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const todoStore = useTodoStore()
const router = useRouter()

const todoText = ref("")
const todoType: Ref<TodoType> = ref("")
const todoDesc = ref("")

async function createTodo() {
  const newTodo: Todo = {
    id: new Date().getTime().toString(),
    isChecked: false,
    todoDescription: todoDesc.value,
    todoText: todoText.value,
    todoType: todoType.value,
    userId: authStore.user.id ? authStore.user.id : "",
  }
  if (newTodo.userId) {
    if (await todoStore.createTodo(newTodo)) {
      alert("Todo created with success")
      todoStore.showTodoTypes.splice(0, todoStore.showTodoTypes.length)
      todoStore.showTodoTypes.push(newTodo.todoType)
      localStorage.setItem(
        "showTodoTypes",
        JSON.stringify(todoStore.showTodoTypes)
      )
      todoStore.showTodoAvaiability = "active"
      localStorage.setItem("showTodoAvaiability", "active")
      router.push({ name: "todo-list" })
    }
  }
}
</script>

<style scoped>
.container-child {
  grid-area: main;
}

main {
  margin: 3.125rem 5rem;
  padding: 1rem;
  border: 1px solid var(--todo-border-color);
  border-radius: 0.5rem;

  background-color: var(--todo-bg-color);

  transition-property: background-color, border-color, color;
  transition-duration: 0.35s;

  & > div {
    h1 {
      font: var(--font-xl);
      text-transform: uppercase;
    }
  }
}
</style>
