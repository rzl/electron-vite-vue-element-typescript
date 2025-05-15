export {}; // 这句不能删
import { I_utils, Utils } from '@/utils/utils'
import { Axios } from 'axios';
import { Request } from './utils/request';
import { Storage } from './utils/storage';
import { Message } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: Message
    $router: VueRouter
    $route: Route
  }

}

declare global {
  interface ElectronContextCallOptions {
    method: string;
    path: string;
    body?: any;
    params?: any;
  }

  interface ElectronContextCallResponse {
    code: number;
    message: string;
    result: any;
  }

  type ElectronContextCallResponsePromise = Promise<ElectronContextCallResponse>;

  interface Window {
    vue: DefineComponent;
    Vue: VUE.App<Element>;
    VUE: VUE;
    electronContext: {
      call: (options: ElectronContextCallOptions) => ElectronContextCallResponsePromise; // 使用全局类型 Options
    };
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
