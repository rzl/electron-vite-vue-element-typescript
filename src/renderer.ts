/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import * as VUE from 'vue'
import { createApp } from 'vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from '@/App.vue'
import { store } from '@/store/index'
import vueProp from '@/utils/vue.prop'



async function main() {
    const app = createApp(App)
    window.Vue = app
    window.VUE = VUE
    app.use(ElementPlus, {
        locale: zhCn,
    })

    app.use(router)
    app.use(store)
    app.mount('#app')
    vueProp(app)

}
main()
const loadEl = document.querySelector('#index-loading') as HTMLElement
if (loadEl) {
    loadEl.style.display = 'none'
}

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
