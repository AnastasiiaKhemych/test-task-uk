import { Post } from '../types/Post'
import { client } from '../utils/fetchClient'
import * as _ from 'lodash'

export const getCategories = async (): Promise<string[]> => {
    const posts = await client.get<Post[]>(`/post`)
    const categories = posts.data.map((post) => post.category)

    return _.uniq(categories)
}
