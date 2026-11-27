import type { Post } from "../types/posts";
import { CommentsSection } from "./CommentsSection"; 

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="post-card">
            <div className="post-top">
                <span className="post-category">{post.category?.name ?? "Без категорії"}</span>
            </div>

            <div className="post-body">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">{post.content}</p>
            </div>

            <div className="post-bottom">
                <span className="post-author">{post.author?.email ?? "Невідомий автор"}</span>
            </div>

            <CommentsSection postId={post.id} />
        </div>
    );
}