import { Axios } from 'axios';
import { useDark, useToggle } from "@vueuse/core";

import {storage as _storage} from './storage'

import {request as _request}  from './request'
export class Utils {
    storage = _storage
    request = _request
    /**
     * 判断子元素是否再目标元素内
     * @param el 子元素
     * @param parentEl 目标元素
     * @returns 
     */
    isParent(el: HTMLElement, parentEl: HTMLElement) {
        while (el != undefined && el != null && el.tagName.toUpperCase() != 'BODY') {
            if (el == parentEl) {
                return true;
            }
            el = el.parentNode as HTMLElement;
        }
        return false;
    }

    notes = {} as any

    setNote(key: string, value: any): void
    setNote(key: string, value: any, once: boolean): void
    setNote(...args: any[]): void {
        let [key, value, once = true] = args
        this.notes[key] = { value, once }
    }

    getNote(key: string): any
    getNote(key: string, def: any): any
    getNote(key: string, def: any, del: boolean): any
    getNote(...args: any[]): any {
        var [key, def, del = false] = args
        let d = this.notes[key] || {}
        if (d.once || del) {
            delete this.notes[key]
        }
        return d.value || def
    }

    querySelectorAll(name: string): Promise<HTMLElement[]>
    querySelectorAll(name: string, times: number): Promise<HTMLElement[]>
    querySelectorAll(...args: any[]): Promise<HTMLElement[]> {
        let [name, times = 100] = args
        return new Promise((resolve) => {
            (function next(times) {
                var nodes = document.querySelectorAll(name) as unknown as HTMLElement[]
                if (nodes && nodes.length > 0) {
                    resolve([...nodes])
                } else {
                    times--
                    setTimeout(() => {
                        times > 0 ? next(times) : resolve([])
                    }, 300)
                }
            })(times)
        })
    }

    async hookJS(result: any, fn: Function): Promise<any> {
        if (result && result.constructor.name == 'Promise') {
            try {
                let res = await result
                await (fn && fn(res))
            } catch (e: any) {
                console.error(e)
            }
        } else {
            if (result !== false) {
                await (fn && fn())
            }
        }
    }

    isDark = useDark();
    toggleDark = useToggle(this.isDark);
}
export const utils = new Utils()

export const request = _request
export default utils
