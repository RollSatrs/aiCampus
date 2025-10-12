'use client'

import useRole from "@/hooks/RoleContext"
import { anmatescale } from "../const/Animate"

import React, { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { discription } from "../const/Description"
import { RegUser } from "@/services/authServices"
import Link from "next/link"
import { motion ,AnimatePresence } from "framer-motion"

interface Props {}



export function RegForms({}: Props) {
    const [fullname, setFullName] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword]= useState("")
    const {role, setRole} = useRole()
    const [department, setDepartment]= useState('')
    const [error, setError]= useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const hadlerReg = async(e: React.FormEvent)=>{
        try{
            e.preventDefault()
            setLoading(true)
            setError(null)
            if(!email.trim() || !password.trim()){
                setError("Пожалуйста, заполните все поля.");
                return;
            }
            if(password !== confirmPassword){
                setError('Пароли не совподают')
            }
            const data = await RegUser({fullname, email, password, role, department})
            console.log('Успешна регистрация', data)
        }catch(err: any){
            setError(err.message)
        }finally{setLoading(false)}
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-black/80  text-xs p-2 rounded-xl mb-5 mt-5">SIGN UP</div>
            {loading? <Spinner className="size-6"/> : ''}
            <h2 className="font-semibold text-2xl mb-1">Welcome</h2>
            <p className="text-xs text-gray-300 text-center mb-6">{discription}</p>
            <form onSubmit={hadlerReg} className="space-y-3 flex flex-col items-center w-full">
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    className={`${anmatescale} w-[85%] placeholder:text-gray-350 placeholder:text-base focus:outline-none border-b-2 border-l-2 border-r-2 border-gray-300/10 rounded-xl p-2 shadow-lg text-sm`}
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    className={`${anmatescale} w-[85%] placeholder:text-gray-350 placeholder:text-base focus:outline-none border-b-2 border-l-2 border-r-2 border-gray-300/10 rounded-xl p-2 text-sm shadow-lg`}
                    value={confirmPassword}
                    onChange={(e) =>setConfirmPassword(e.target.value)}
                />
                <AnimatePresence mode="wait">
                    {
                        role === 'TEACHER'&&(
                            <motion.input
                                key="department-input"
                                type="text"
                                placeholder="Department"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className={`${anmatescale} w-[85%] placeholder:text-gray-350 placeholder:text-base focus:outline-none border-b-2 border-l-2 border-r-2 border-gray-300/10 rounded-xl p-2 text-sm shadow-lg`}
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        )
                    }
                </AnimatePresence>
                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button
                    className="mb-6 text-xl transition-transform duration-300 hover:scale-105 w-[80%] bg-black/80 p-2 font-semibold rounded-xl"
                >
                    Sign Up
                </button>
            </form>
            <div className="flex w-full justify-around">
                    <p className="text-xs">Don’t have an account?</p>
                    <Link href="/auth/login" className="text-xs text-cyan-600 font-semibold hover:underline">Login here</Link>
            </div>

        </div>
    )
}
