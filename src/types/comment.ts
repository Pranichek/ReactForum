import type { User } from "./user"

export type Comment = {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    createdAt: string;
    author: User;
};

export type CreateCommentRequest = {
    postId: number;
    content: string;
};

export type DeleteCommentRequest = {
    commentId: number;
    postId: number;
};

