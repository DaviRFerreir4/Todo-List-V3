import { createApp } from "vue"
import App from "./App.vue"

import { createPinia } from "pinia"
import { router } from "./routes/routes"

import "./styles/global.css"
import "./styles/utility.css"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount("#app")
