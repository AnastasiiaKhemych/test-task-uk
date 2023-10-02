export interface Post {
    id: number
    category: string
    name: string
    text: string
}

export interface DataWithMeta<T> {
    data: T[]
    meta: {
        total: number
        page?: number
        limit?: number
    }
}
