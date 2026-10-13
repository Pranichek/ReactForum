import type { Post } from "../types/posts";
import { PostCard } from "./postCard";


interface PostListProps{
    posts: Post[]
}

export function PostList({ posts }: PostListProps) {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    )
}