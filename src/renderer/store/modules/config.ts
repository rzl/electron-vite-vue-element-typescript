import { defineStore } from 'pinia'
var pe = process.env as any as I_config

var config = {
    login_title: 'admin',
    size: 'small',
    zIndex: 3000
}

export interface I_config {
	login_title: string;
}

export const configStore = defineStore("config", {
  state: () => {
    return {
      ...config,
      ...pe,
      ...window.CONFIG
    }
  },
  getters: {
    get_login_title: (state) => state.login_title,
    get_size: (state):any => state.size,
    get_z_index: (state) => state.zIndex,
  },
  actions: {
    updateConfig(key: string, value: any) {
      var that = this as any
      that[key]= value
    }
  }
})