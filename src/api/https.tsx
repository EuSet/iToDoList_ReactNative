export type methodType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type configType = {
    method: methodType
    headers: typeof Https.HEADERS
    body?: string
}

export class Https {
    static HEADERS = {'Content-Type': 'application/json'} as const

    static async get(url: string) {
        try {
            return await request(url, 'GET')
        } catch (e) {
            throw new Error(e)
        }
    }

    static async post(url: string, title: string) {
        try {
            return await request(url, 'POST', title)
        } catch (e) {
            throw new Error(e)
        }
    }
    static async patch(url: string, title: string) {
        try {
            return await request(url, 'PATCH', title)
        } catch (e) {
            throw new Error(e)
        }
    }
    static async delete(url: string) {
        try {
            return await  request(url, 'DELETE')
        } catch (e) {
            throw new Error(e)
        }
    }


}

async function request(url: string, method: methodType, title?: string) {
    const config: configType = {
        method: method,
        headers: Https.HEADERS
    }
    if (method === 'POST' || method === 'PATCH') {
        config.body = JSON.stringify({title})
    }
    const res = await fetch(url, config)
    return await res.json()
}
