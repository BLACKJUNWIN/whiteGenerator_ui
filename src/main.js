import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
let app = createApp(App);
import store from "./store"
import BlButton from "./components/bl_button";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component("bl-button",BlButton);
app.use(store).use(router).use(ElementPlus)
app.mount('#app')
