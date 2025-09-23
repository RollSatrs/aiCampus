export interface JwtPayload{
    sub: number;
    email: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN'
}