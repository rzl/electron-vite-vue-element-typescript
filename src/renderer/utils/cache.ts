

export interface I_cache {
    cache:any
    setCache(key: string, value: any): any
    getCache(key: string, value: any): any
    clearCache(): any
}


export const cache = {} as any

export function setCache(key: string, value: any) {
    console.log('setCache', key, value)
    cache[key] = value
}

export function getCache(key: string, value: any): any {
    console.log('getCache', key, cache[key], value)
    return cache[key]
}

export function clearCache() {
    for (var key in cache) {
        delete cache[key];
    }
}