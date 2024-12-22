import { ReactNode } from "react"


const GlobalProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* <ImageUploader>
               
            </ImageUploader> */}
            {children}
        </>
    )
}

export default GlobalProvider