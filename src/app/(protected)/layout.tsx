import { ReactNode } from "react";

export default function ProtectedLayout({children}: {children:ReactNode}){
    return(
        <div className="bg-gray/500">
            {children}
        </div>
    )
}