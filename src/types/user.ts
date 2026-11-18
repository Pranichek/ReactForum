export interface User {
    id: number
    email: string
}

export interface RegisterRequest {
    email: string
    password: string
}

export interface RegisterResponse {
    id: number
    email: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    id: number
    email: string
}