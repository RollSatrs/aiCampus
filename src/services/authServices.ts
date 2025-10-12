import { AuthLoginType, AuthRegisterType } from "@/type/auth.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function loginUser(params: AuthLoginType) {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    })
    if(response.status === 401){
        throw new Error("Неверный email или пароль");
    }
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.message || "Ошибка входа")
    }

    return response.json
}

export async function RegUser(params:AuthRegisterType) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    })
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.message || "Ошибка входа")
    }
    return response.json
}