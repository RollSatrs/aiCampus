'use client'

import { activeButton, anmatescale, inactiveButton } from "../const/Animate"
import useRole from "@/hooks/RoleContext";

export function RoleButtons() {
    const {role, setRole}=useRole()
    return (
        <div className="flex justify-center mb-2 space-x-5">

            <button
                className={`px-3 py-1 rounded-xl text-sm transition-all duration-300 ${role === "STUDENT"? `${activeButton}`: `${inactiveButton}`}`}
                onClick={() => setRole("STUDENT")}
            >
                Student
            </button>

            <button
                className={`px-3 py-1 rounded-xl text-sm transition-all duration-300 ${role === "TEACHER"?  `${activeButton}`: `${inactiveButton}`}`}
                onClick={() => setRole("TEACHER")}
            >
                Teacher
            </button>

        </div>
    )
}
