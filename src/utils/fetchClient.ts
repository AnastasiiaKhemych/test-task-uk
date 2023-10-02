const BASE_URL = 'http://localhost:4000'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function request<T>(
    url: string,
    method: RequestMethod = 'GET',
    data: any = null
): Promise<{ data: T; headers: Headers }> {
    const options: RequestInit = { method }

    if (data) {
        options.body = JSON.stringify(data)
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }

    return fetch(BASE_URL + url, options).then(async (response) => {
        if (!response.ok) {
            throw new Error()
        }

        return { data: await response.json(), headers: response.headers }
    })
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
    patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
    delete: (url: string) => request(url, 'DELETE'),
}
