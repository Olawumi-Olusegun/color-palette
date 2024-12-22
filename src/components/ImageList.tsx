import ImageUploader, { useImageUpload } from "./ImageUploader";


const ImageList = () => {

    const { uploadedImage } = useImageUpload();

    return (
        <>
            <div className="relative w-full flex flex-col items-center gap-3 lg:w-[40%] mx-auto rounded-md border border-[#363636] hover:bg-[#363636]/30 duration-300 h-60 shrink-0 overflow-hidden">
                {
                    uploadedImage ? (
                        <div className="w-full flex flex-col items-center justify-center gap-3 ">
                            <ImageUploader.Preview />
                        </div>
                    )
                        : (
                            <ImageUploader.Trigger className="h-full w-full flex flex-col gap-1 px-3 text-white/80">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-white/80 font-medium text-xs">No image selected</span>
                                    <span className="text-white/80 font-light text-xs">Click to upload image and generate color palettes from image</span>
                                </div>
                            </ImageUploader.Trigger>

                        )
                }
            </div>
            <div className="w-full lg:w-[80%] mx-auto mt-6">
                <ImageUploader.Palette />
            </div>
        </>
    )
}





export default ImageList
