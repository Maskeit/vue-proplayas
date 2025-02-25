export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'editor';
}

// seccion del registro
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface RegisterResponse {
    status: number;
    message: string;
    data: string;
}