'use client'

import { RoleType } from "@/type/role.interface";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextType{
    role: RoleType
    setRole: (role: RoleType) => void
}

const RoleContext = createContext<ContextType | null>(null)

export function RoleProvider({children}: {children: ReactNode}){
    const [role, setRole] = useState<RoleType>("STUDENT")
    return(
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    )
}

export default function useRole(){
    const context = useContext(RoleContext)
    if(!context) throw new Error("useRole must be used inside RoleProvider");
    return context
}