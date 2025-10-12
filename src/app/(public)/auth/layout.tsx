import { PropsWithChildren } from "react";
import { LineOr } from "./components/LineOr";
import { RoleButtons } from "./components/RoleButtons";
import { LoadingTest } from "./components/LoadingTest";
import Wrapper from "./components/Wrapper";

export default function AuthLayout({children}: PropsWithChildren<unknown>){
    return(
        <div className="h-screen w-full bg-[url('/lucas-unsplash.jpg')] bg-cover bg-center flex flex-col items-center justify-center">
            <Wrapper>{children}</Wrapper>
        </div>
    )
}