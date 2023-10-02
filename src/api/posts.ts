import { DataWithMeta, Post } from '../types/Post'
import { client } from '../utils/fetchClient'

export const getPost = async ({
    category,
    name,
    page,
    limit,
}: {
    category?: string
    name?: string
    page?: number
    limit?: number
}): Promise<DataWithMeta<Post>> => {
    const params = new URLSearchParams()

    if (category) {
        params.append('category', category)
    }

    if (name) {
        params.append('name_like', name)
    }

    if (page) {
        params.append('_page', (page + 1).toString())
    }

    if (limit) {
        params.append('_limit', limit.toString())
    }

    const response = await client.get<Post[]>(`/post?${params.toString()}`)

    return {
        data: response.data,
        meta: {
            total: Number(response.headers.get('X-Total-Count')),
            page,
            limit,
        },
    }
}

export const addPost = ({ name, text, category }: Omit<Post, 'id'>) => {
    return client.post<Post>('/post', { name, text, category })
}

export const deletePost = (id: number) => {
    return client.delete(`/post/${id}`)
}

export const updatePost = ({ id, name, category, text }: Partial<Post>) => {
    return client.patch<Post>(`/post/${id}`, { name, category, text })
}
