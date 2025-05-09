/**
 * author: rzl
 */
const localStorage = window.localStorage
export interface I_key {
    token: string;
    tenant_id: string;
    user_id: string;
}

export const key = {
    token: '__token',
    tenant_id: '__tenant_id',
    user_id: '__user_id'
}
export class Storage {



    /**
     * 存储数据
     * @param name 
     * @param content 
     */
    setStore(name: string, content: any): void {
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        localStorage.setItem(name, content)
    };

    /**
     * 获取存储数据
     * @param name 
     * @returns 
     */
    getStore(name: string): any {
        let content = localStorage.getItem(name)
        try {
            return JSON.parse(content as string)
        } catch (e) {
            return content
        }
    };

    /**
     * 存储会失效的数据
     * 
     * @param name 
     * @param content 
     * @param maxAge 
     */
    setExpireStore(name: string, content: any, maxAge: number): void {
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        localStorage.setItem(name,
            JSON.stringify({
                content,
                maxAge: new Date().getTime() + maxAge
            }))
    };

    /**
     * 获取会失效的数据
     * @param name 
     * @returns 
     */
    getExpireStore(name: string): any {
        let str = localStorage.getItem(name)
        if (!str) return null
        let item = JSON.parse(str)
        if (!item.maxAge) return null
        if (item.maxAge < new Date().getTime()) {
            console.log('当前数据存储已失效', name, item)
            this.clearStore(name)
            return null
        }
        try {
            return JSON.parse(item.content)
        } catch (e) {
            return item.content
        }
    };

    /**
     * 清除指定键的存储
     * @param name 
     */
    clearStore(name: string) {
        localStorage.removeItem(name)
    };

    /**
     * 清除所有存储
     */
    clearAll() {
        localStorage.clear()
    }



    /**
     * 获取token
     * @returns 
     */
    getToken() {
        return this.getExpireStore(key.token)
    }

    /**
     * 存储token
     * @param token 
     * @returns 
     */
    setToken(token: string) {
        return this.setExpireStore(key.token, token, 2 * 60 * 60 * 1000)
    }

    /**
     * 删除token
     */
    removeToken() {
        this.removeUserId()
        this.clearStore(key.token)
    }

    /**
     * 获取当前用户ID
     * @returns 
     */
    getUserId(): string | null {
        return this.getStore(key.user_id)
    }

    /**
     * 存储用户ID
     * @param user_id 
     * @returns 
     */
    setUserId(user_id: string) {
        return this.setStore(key.user_id, user_id)
    }

    /**
     * 清除存储的用户id
     * @returns 
     */
    removeUserId() {
        return this.clearStore(key.user_id)
    }

    /**
     * 生成用户存储的键名
     * @param name 
     * @returns 
     */
    buildUserStorageName(name: string) {
        let user_id = this.getStore(key.user_id)
        if (!user_id) {
            console.error('获取user_id存储失败:', key.user_id)
            return
        }
        return `user_storage_${user_id}_${name}`
    }

    /**
     * 根据键名获取用户存储
     * @param name 
     * @returns 
     */
    getUserStorage(name: string) {
        let k = this.buildUserStorageName(name)
        if (k) {
            return this.getStore(k)
        }
    }

    /**
     * 存储用户数据
     * @param name 
     * @param content 
     */
    setUserStorage(name: string, content: any) {
        let k = this.buildUserStorageName(name)
        if (k) {
            this.setStore(k, content)
        }
    }

    /**
     * 获取存储的租户id
     * @returns 
     */
    getTenantId() {
        return this.getStore(key.tenant_id)
    }

    /**
     * 存储租户id
     * @param tenant_id 
     * @returns 
     */
    setTenantId(tenant_id: string) {
        return this.setStore(key.tenant_id, tenant_id)
    }

    /**
     * 清除租户id
     * @returns 
     */
    removeTenantId() {
        return this.clearStore(key.tenant_id)
    }
}

export const storage = new Storage()
export default storage
