import type { Category } from "./category"
import type { User } from "./user"

export interface Post {
    id: number
    title: string
    content: string
    categoryId: number | null     
    authorId: number | null       
    category: Category | null     
    author: User | null            
}