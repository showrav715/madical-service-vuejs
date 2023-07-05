import { createApp } from "vue";


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import router from "./routes.js";
import App from "./App.vue";
import "./style.css";

createApp(App)
.use(router)
.mount("#app");
