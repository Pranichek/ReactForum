import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/posts";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../types/user";


export const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: "include",
    }),
    tagTypes: ["Me"],
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
        })
    })
})

export const { useGetPostsQuery, useRegisterMutation, useLoginMutation, useGetMeQuery } = baseAPI