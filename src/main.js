/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPhone,
  faMagnifyingGlass,
  faBagShopping,
  faBook,
  faCirclePlay,
  faShapes,
  faCircleCheck,
  faPen,
  faHeart,
  faComment,
  faUser,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router/router";
import { registerPlugins } from "@/plugins";
import mitt from "mitt";
const emitter = mitt();
import Skeleton from "vue-loading-skeleton";
import "vue-loading-skeleton/dist/style.css";
// Components
import App from "./App.vue";
library.add(
  faPhone,
  faMagnifyingGlass,
  faBagShopping,
  faBook,
  faCirclePlay,
  faShapes,
  faCircleCheck,
  faPen,
  faHeart,
  faComment,
  faUser,
  faEnvelope
);
// Composables
import { createApp } from "vue";
// Supports weights 200-900
import "@fontsource-variable/nunito-sans/wght.css";
import '@fontsource-variable/nunito-sans';
import '@/assets/global.css';
const pinia = createPinia()
const app = createApp(App);

registerPlugins(app);
app.use(Skeleton);
app.use(pinia)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
