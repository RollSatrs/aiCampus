import { RoleType } from "./role.interface"

export interface AuthLoginType{
    email: string
    password: string
}

export interface AuthRegisterType{
    fullname: string
    email: string
    password: string
    role: RoleType
    department?: string
}