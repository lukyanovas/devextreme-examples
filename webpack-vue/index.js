import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "devextreme/dist/css/dx.spa.css";

import Vue from "vue";
import App from "./app.vue";

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});
