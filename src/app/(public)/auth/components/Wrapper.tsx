export default function Wrapper({children}: {children: React.ReactNode}) {
    return (
        <div className="w-[400px] border-amber-50 bg-neutral-900/5 backdrop-blur flex flex-col p-6 rounded-4xl mr-2">
                {children}
        </div>
    )
}
