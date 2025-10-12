'use client'

import { Spinner } from "@/components/ui/spinner"
import { resolve } from "path"
import { useState } from "react"

export function LoadingTest() {
    const [loading, setLoading] = useState(false)
    const hadlerLoading = async(e: React.FormEvent) =>{
        console.log('werewrwerewr')
        e.preventDefault()
        try{
            console.log('ваваыаваы')
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000))
        }catch(err){
            console.log('Не понятная ошиюка', err)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center space-y-2">

            <div className="text-center text-black font-bold">Click</div>
            <button
                className="bg-white w-10 h-10 rounded-full"
                onClick={(e) =>hadlerLoading(e)}
            >
            </button>
            {
                loading? <Spinner className="size-6"/> : ""
            }
        </div>
    )
}
