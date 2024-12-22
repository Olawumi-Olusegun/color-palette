import { HTMLAttributes } from "react"

interface RootLayoutProps extends HTMLAttributes<HTMLDivElement> { }

const RootLayout = ({ children, className, ...props }: RootLayoutProps) => {
    return (
        <div className={`w-full min-h-dvh overflow-y-auto flex flex-col gap-3 ${className}`} {...props}>{children}</div>
    )
}

export default RootLayout