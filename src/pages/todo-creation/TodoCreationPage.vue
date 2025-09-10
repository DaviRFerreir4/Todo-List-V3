<template>
  <!-- Container principal da página -->
  <main class="grid justify-center align-center">
    <!-- Formulário para a inserção e envio de dados do todo -->
    <form class="grid gap-1" @submit.prevent="createTodo">
      <!-- Input de texto do todo -->
      <TextInputs
        input-id="todo"
        input-name="todo"
        input-placeholder="Insert your todo"
        input-required
        input-type="text"
        label-text="Todo"
        @recover-value="todoText = $event"
      ></TextInputs>
      <!-- Select de tipo do todo -->
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
      <!-- Textarea de descrição do todo -->
      <TextInputs
        input-id="todo-description"
        input-name="todo-description"
        input-placeholder="Insert your todos description"
        input-required
        input-type="textarea"
        label-text="Todo"
        @recover-value="todoDesc = $event"
      ></TextInputs>
      <!-- Botão de envio do formulário -->
      <Button button-text="Create"></Button>
    </form>
  </main>
</template>

<script setup lang="ts">
// Importação de componentes
import TextInputs from "@/components/forms/TextInputs.vue"
import Select from "@/components/forms/Select.vue"
import Button from "@/components/forms/Button.vue"

// Importações do vue
import { ref } from "vue"

// Importações de pacotes
import { useRouter } from "vue-router"

// Importação de stores
import { useTodoStore } from "@/stores/todoStore"
import { useAuthStore } from "@/stores/authStore"

// Importação de tipos
import type { Ref } from "vue"
import type { Router } from "vue-router"
import type { Todo } from "@/interfaces/ITodo"
import type { TodoType } from "@/types/TodoType"

// Declaração das stores e router
const authStore = useAuthStore()
const todoStore = useTodoStore()
const router: Router = useRouter()

// Recuperando os dados do todo do formulário
const todoText: Ref<string> = ref("")
const todoType: Ref<TodoType> = ref("")
const todoDesc: Ref<string> = ref("")

// Função para criação de todos
async function createTodo(): Promise<void> {
  // Cria um novo todo baseado nos dados do formulário e outros dados (data, boleano padrão e userId)
  const newTodo: Todo = {
    id: new Date().getTime().toString(),
    isChecked: false,
    todoDescription: todoDesc.value,
    todoText: todoText.value,
    todoType: todoType.value,
    userId: authStore.user.id ? authStore.user.id : "",
  }
  // Tenta criar o todo no banco
  if (await todoStore.createTodo(newTodo)) {
    // Caso consiga, mostra uma mensagem para o usuário
    alert("Todo created with success")
    // Troca os todoTypes para mostrar somente o tipo que acaba de ser inserido
    todoStore.changeShowTodoTypes([newTodo.todoType], true)
    // Troca a todoAvaiabitilty para mostrar somente os todos ativos
    todoStore.changeShowTodoAvaiability("active")
    // Leva o usuário para a rota de listagem de todos
    router.push({ name: "todo-list" })
  } else {
    // Caso não consiga criar, mostra essa mensagem
    alert(
      "It wans't possible to create a new todo in the database\nPlease, try again later"
    )
  }
}
</script>

<style scoped>
main {
  grid-area: main;
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
