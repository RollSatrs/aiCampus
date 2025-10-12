// import { Login } from "@/type/login.interface";
"use client";
import { Spinner } from "@/components/ui/spinner";
import { anmatescale } from "../const/Animate";
import Link  from "next/link";
import { useState } from "react";
import { discription } from "../const/Description";
import { loginUser } from "@/services/authServices";



export default function AuthForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]= useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const hadlerLogin = async(e: React.FormEvent) =>{
        try{
            e.preventDefault()
            console.log('fdfs')
            setLoading(true)
            setError(null)
            if(!email.trim() || !password.trim()){
                setError("Пожалуйста, заполните все поля.");
                return;
            }
            const data = await loginUser({email, password})
            console.log('Успешный вход', data)

        }catch(err:any){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-black/80  text-xs p-2 rounded-xl mb-5">LOG IN</div>
            {loading? <Spinner className="size-6"/> : ''}
            <h2 className="font-semibold text-2xl mb-1">Welcome</h2>
            <p className="text-xs text-gray-300 text-center mb-6">{discription}</p>
            <form onSubmit={hadlerLogin} className="space-y-3 flex flex-col items-center w-full">
                <input
                    type="email"
                    placeholder="Email"
                    className={`${anmatescale} w-[85%] placeholder:text-gray-350 placeholder:text-base focus:outline-none border-b-2 border-l-2 border-r-2 border-gray-300/10 rounded-xl p-2 shadow-lg text-sm`}
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={`${anmatescale} w-[85%] placeholder:text-gray-350 placeholder:text-base focus:outline-none border-b-2 border-l-2 border-r-2 border-gray-300/10 rounded-xl p-2 text-sm shadow-lg`}
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button
                    className="mb-6 text-xl transition-transform duration-300 hover:scale-105 w-[80%] bg-black/80 p-2 font-semibold rounded-xl"
                >
                    Log In
                </button>
            </form>
            <div className="flex w-full justify-around">
                    <p className="text-xs">Don’t have an account?</p>
                    <Link href="/auth/register" className="text-xs text-cyan-600 font-semibold hover:underline">Register here</Link>
            </div>

        </div>
    )
}
