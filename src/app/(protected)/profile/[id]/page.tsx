'use client'

import { useParams } from "next/navigation"

export default function page() {
    const params = useParams()
    const {id} = params

    return (
        <div>
            <h1 className="">
                Вот мой профиль вот с таким id: №{id}
            </h1>
        </div>
    )
}
