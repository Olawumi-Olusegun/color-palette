// @ts-ignore
import ColorThief from "colorthief"
import ImageUploader from "./ImageUploader";


const Header = () => {

    return (
        <>
            <div className="w-full flex items-center justify-between h-12 px-3 py-1 border-b border-[#363636]">
                <a href="/">
                    <h2 className="font-bold text-lg text-white/80">ColorPalette</h2>
                </a>
                <div className="h-full w-fit rounded-full overflow-hidden border border-[#363636] hover:bg-[#363636]/50 duration-300">
                    <ImageUploader.Trigger className="h-full w-full px-3 text-white/80">
                        <span className="font-medium text-xs">Upload Image</span>
                    </ImageUploader.Trigger>
                </div>
            </div>
        </>
    )
}

export default Header