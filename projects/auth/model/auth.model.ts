export interface LoginResDto {
    code: number;
    status: string;
    data: any;
}

export interface UserSessionResponse {
    role: string;
    userId: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface RegisterReqDto {
    username: string;
    password: string;
    email: string;
    genderId: string;
    fullName: string;
}

export interface OtpReqDto {
    code: number;
}

export interface LoginReqDto {
    username: string;
    password: string;
}
