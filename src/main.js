import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

export const eventBus = new Vue();

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  next();
});
