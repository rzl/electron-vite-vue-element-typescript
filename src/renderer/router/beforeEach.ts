import { userStore } from "@/store/modules/user"
import storage from "@/utils/storage"
import utils from "@/utils/utils"
import nProgress from "nprogress"
import { Router, RouteRecordRaw } from "vue-router"
const routeAllPathToCompMap = import.meta.glob("../views/**/*.vue");
console.log(routeAllPathToCompMap)
const whiteList = ['/login']
export function setBeforeEach(router: Router) {
    router.beforeEach(async (to, from, next) => {
        nProgress.start()
        console.log(to.path)
        if (whiteList.indexOf(to.path) !== -1) {
            return next()
        }
        if (!storage.getToken()) {
            return next({ path: '/login' })
        }
        if (userStore().getmenu.length == 0) {
            try {
                let { menu } = await userStore().fetchMenu()
                if (menu.length == 0) { throw new Error('menu length 0') }
                let new_menu = resolveMenu(menu)
                    router.addRoute(new_menu)
            } catch (e) {
                console.error(e)
                await userStore().loginOut()
                next({ path: '/login' })
            }
            return next({ path: to.path })
        }
        if (to.name == '__404NotFound__') {
            return next()
        }
        next()
    })
    router.afterEach(() => {
        nProgress.done()
    })
}

/**
 * 菜单解释
 * @param menu 
 * @returns 
 */

function resolveMenu(menu: any[]): any {
    function _resolveMenu(menu: any[]): any {
        menu.forEach((m) => {
            if (m.route == 1) {
                m._component = m.component
                m.component = routeAllPathToCompMap[`../${m.component}`]
            } else {
                m.component=  () => import('@/components/layouts/rv.vue')
                if (m.children && m.children.length > 0) {
                    _resolveMenu(m.children)
                }
            }
        })

        return menu
    }
    
    let mainRoute = {
        path: '/',
        component: () => import('@/components/layouts/default/default.vue'),
        children: _resolveMenu(menu)
    }
    console.log(mainRoute)
    return mainRoute
}