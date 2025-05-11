import storage from '@/utils/storage';
import { request } from '@/utils/utils'
import { defineStore } from 'pinia'

export interface I_userInfo {
  userInfo: {
    id: string;
    username: string;
    password: string;
  };
  token: string;
}

export interface I_menu {
  id: string;
  name: string;
  path: string;
  component: string;
  meta: {
    hidden: boolean;
    route: string;
    internalOrExternal: boolean;
    izMobile: boolean;
    keepAlive: boolean;
    menuColor: string;
    title: string;
    icon: string;
  };
}

export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        id: '',
        username: '',
        password: ''
      },
      menu: [],
      button_permission: [],
      token: storage.getToken()
    }
  },
  getters: {
    getUserInfo: (state) => state.userInfo,
    getmenu: (state) => state.menu,
    getToken: (state): string => {
      return state.token
    }
  },
  actions: {
    async login(userInfo: any) {
      try {
        let res = await request.guest.login(userInfo)
        if (res.statusCode == 200) {
          let { token } = res.result
          this.token = token
          storage.setToken(token)
          await this.fetchUserInfo()
          return res
        } else {
          throw res
        }
      } catch (e) {
        console.error(e)
        throw e
      }

    },
    async loginOut() {

    },
    async fetchUserInfo() {
      try {
        let res: any = await request.userRequest.getUserInfo()
        if (res.code == '200') {
          this.userInfo = res.result
        }
      } catch (e) {
        console.error(e)
      }
    },
    async fetchMenu(): Promise<any> {
      try {
        let res: any = await request.userRequest.getPermissions()
        if (res.code == '200') {
          var { menu, button_permission } = res.result
          this.menu = menu
          this.button_permission = button_permission
          return res.result
        }
        return []
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})