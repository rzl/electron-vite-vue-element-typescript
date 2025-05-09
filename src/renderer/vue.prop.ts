import { configStore } from '@/store/modules/config'
import { userStore } from '@/store/modules/user'
import * as VUE from 'vue'
import utils from './utils'

export default function vueProp (app: VUE.App<Element>) {
    app.config.globalProperties.$request = utils.request
    app.config.globalProperties.$utils = utils
    app.config.globalProperties.$storage = utils.storage
    app.config.globalProperties.$store = {
        userStore: userStore(),
        configStore: configStore()
    }
}