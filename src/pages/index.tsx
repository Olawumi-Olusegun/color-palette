import Header from "../components/Header"
import ImageList from "../components/ImageList"
import RootLayout from "./layouts/RootLayout"

export type RGB = [number, number, number];

export type ColorPalette = RGB[];

const Homepage = () => {

    return (
        <RootLayout>
            <Header />
            <div className="px-3 w-full my-5">
                <ImageList />
            </div>
            <footer className="w-full mt-auto my-3 flex items-center justify-center  text-white/50 font-medium text-xs ">
                &copy; Olawumi Olusegun {" "} {new Date().getFullYear()}
            </footer>
        </RootLayout>
    )
}

export default Homepage