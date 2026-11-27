import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/posts";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../types/user";
import type { Comment, CreateCommentRequest , DeleteCommentRequest} from "../types/comment";


export const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: "include",
    }),
    tagTypes: ["Me", "Comments"],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts'
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: "/auth/register",  
                method: "POST",        
                body: body              
            })
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Me"]
        }),
        getMe: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: ["Me"]
        }),
        getComments: builder.query<Comment[], number>({
            query: (postId) => `/posts/${postId}/comments`,
            providesTags: ["Comments"]
        }),
        createComment: builder.mutation<Comment, CreateCommentRequest>({
            query: ({ postId, content }) => ({
                url: `/posts/${postId}/comments`,
                method: "POST",
                body: { content }
            }),
            invalidatesTags: ["Comments"]
        }),
        deleteComment: builder.mutation<void, DeleteCommentRequest> ({
            query: ({ commentId }) => ({
                url: `/comments/${commentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Comments"] 
        }),

    })  
})

export const { 
    useGetPostsQuery, 
    useRegisterMutation, 
    useLoginMutation, 
    useGetMeQuery,
    useGetCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation
} = baseAPI