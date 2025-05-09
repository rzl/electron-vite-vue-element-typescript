import { ComponentOptions, DefineComponent, VueElement } from "vue"

export const globalMixin = {
    data() {
        var debounce_key = Symbol('debounce_key')
        //var debounce_key = 'debounce_key' + (Math.random() * 99999999).toFixed(0).toString()
        return {
            __debounce_key: debounce_key,
            [debounce_key]: 0
        }
    },
    methods: {
        $debounce(fn: Function, time: number|null) {
            var debounce_key = this['__debounce_key']
            console.log(debounce_key, this[debounce_key])
            clearTimeout(this[debounce_key])
            this[debounce_key] = setTimeout(() => {
                fn && fn()
            }, time || 300)
        },
        $clearDebounce() {
            var debounce_key = this['__debounce_key']
            clearTimeout(this[debounce_key])
        }
    }
} as ComponentOptions