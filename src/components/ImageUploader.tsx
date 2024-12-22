import { ImageUp, LucideIcon } from "lucide-react";
import { ChangeEvent, createContext, HTMLAttributes, ReactNode, useContext, useRef, useState } from "react";
// @ts-ignore
import ColorThief from "colorthief";
import ColorList from "./ColorList";

export type RGB = [number, number, number];
export type ColorPalette = RGB[];

interface ImageUploaderContextType {
    uploadedImage: string | null;
    colorPalette: ColorPalette | null;
    handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    convertColorToHex: (rgb: number) => void;
    handleResetImage: () => void;
}

const ImageUploaderContext = createContext<ImageUploaderContextType | undefined>(undefined);

export const useImageUpload = (): ImageUploaderContextType => {
    const context = useContext(ImageUploaderContext);
    if (!context) {
        throw new Error("useImageUpload must be used within an ImageUploader provider");
    }
    return context;
};

interface ImageUploaderProps {
    children: ReactNode;
}

const ImageUploaderProvider: React.FC<ImageUploaderProps> = ({ children }) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<ColorPalette | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const img = new Image();
                img.onload = () => {
                    const colorThief = new ColorThief();
                    const palette = colorThief.getPalette(img, 6);
                    setUploadedImage(e.target?.result as string);
                    setColorPalette(palette);
                };
                img.crossOrigin = "Anonymous";
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleResetImage = () => {
        setUploadedImage(null);
        setColorPalette(null);
    };


    const convertColorToHex = (rgb: number) => {
        let hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = `0${hex}`;
        }
        return hex;
    }

    return (
        <ImageUploaderContext.Provider
            value={{ uploadedImage, colorPalette, handleImageUpload, handleResetImage, convertColorToHex }}
        >
            {children}
        </ImageUploaderContext.Provider>
    );
};

interface TriggerProps extends HTMLAttributes<HTMLLabelElement> {
    icon?: LucideIcon;
    iconStyle?: string;
}

const Trigger: React.FC<TriggerProps> = ({ icon: Icon = ImageUp, iconStyle, children, className, ...props }) => {

    const { handleImageUpload } = useImageUpload();

    return (
        <label className={`cursor-pointer h-full w-full flex items-center justify-center gap-2 ${className}`} {...props}>
            <Icon size={18} className={iconStyle || "text-white/80"} />
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
            />
            {children}
        </label>
    );
};

const Preview: React.FC = () => {
    const { uploadedImage, handleResetImage } = useImageUpload();

    return uploadedImage ? (
        <div className="relative w-full h-60">
            <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="w-full h-full object-cover"
            />
            <button
                onClick={handleResetImage}
                className="absolute bottom-2 right-2 px-2 py-1 bg-red-500 hover:bg-red-600 duration-300 text-white text-xs font-medium rounded"
            >
                Reset
            </button>
        </div>
    ) : (
        <p className="text-center text-white/80">No image selected</p>
    );
};

const Palette: React.FC = () => {
    const { colorPalette, convertColorToHex } = useImageUpload();

    return (
        <>
            <div className="w-full lg:w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {
                    colorPalette
                        ? <>
                            {
                                colorPalette.map((color, index) => {
                                    const rgb = `rgb(${color.join(",")})`;
                                    console.log("colors", color[0], color[1], color[2])
                                    const hexOne = color[0] as unknown;
                                    const hexTwo = color[0] as unknown;
                                    const hexThree = color[0] as unknown;
                                    const hexValue = `#${convertColorToHex(Number(hexOne))}${convertColorToHex(Number(hexTwo))}${convertColorToHex(Number(hexThree))}`;
                                    return (<ColorList key={index} rgb={rgb} hexValue={hexValue} />)
                                })
                            }
                        </>
                        : null
                }
            </div>

        </>
    )
};

interface CompoundImageUploader extends React.FC<ImageUploaderProps> {
    Trigger: typeof Trigger;
    Preview: typeof Preview;
    Palette: typeof Palette;
}

const ImageUploader = ImageUploaderProvider as CompoundImageUploader;
ImageUploader.Trigger = Trigger;
ImageUploader.Preview = Preview;
ImageUploader.Palette = Palette;

export default ImageUploader;
