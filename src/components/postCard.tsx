import type { Post } from "../types/posts";

interface PostCardProps{
    post: Post
}

export function PostCard({post}: PostCardProps){
    return (
        <div className="post-card">
            <div className="post-top">
                <span className="post-category">{post.category}</span>
            </div>

            <div className="post-body">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
            </div>

            <div className="post-bottom">
                <span className="post-author">{post.author}</span>
            </div>
        </div>
    )
}