import { createApp, onMounted, ref } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
// fontawesome icon
import router from "./routes.js";
import App from "./App.vue";
import "./style.css";
import { translate } from "./global.js";
import VueDOMPurifyHTML from "vue-dompurify-html";
import VueLazyload from 'vue-lazyload'
const app = createApp(App);

app.config.globalProperties.t = translate;

app.use(router)
app.use(VueLazyload)
.use(VueDOMPurifyHTML).mount("#app");
