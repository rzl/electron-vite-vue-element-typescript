
interface stackData {
    method: string; //get post put delete
    path: any;
    fn: any;
    payload?: any;
}

let stack: { [key: string]: stackData[] } = {}

export async function registerContext(method: string, path: any, fn: (...args: any[]) => any, payload?: any) {
    if (!stack[method]) {
        stack[method] = []
    }
    stack[method].push({
        method: method,
        path: path,
        fn: fn,
        payload
    })
}
export async function getContextFn(method: string, path: any) {
    if (!stack[method]) {
        return null
    }
    return stack[method].find((item) => path === item.path)
}
export async function runContext(method: string, path: any, opt: any) {
    let item = await getContextFn(method, path)
    if (item) {
        return await item.fn(opt)
    } else {
        console.warn(`not found ${method} ${path}`)
    }
}

registerContext('system', '/stack', (opt: any) => {
    return JSON.parse(JSON.stringify(stack))
})