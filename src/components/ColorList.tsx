import { Copy } from "lucide-react";
import { MouseEvent, useState } from "react";

const ColorList = ({ rgb, hexValue }: { rgb: string; hexValue: string }) => {
    const [copiedColor, setCopiedColor] = useState(false);

    const handleCopyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
        const color = event.currentTarget.innerText;
        try {
            navigator.clipboard.writeText(color)
            console.log(`Copied color: ${color}`)
        } catch (error) {
            console.error("Failed to copy color", error)
        } finally {
            setCopiedColor(true)
            setTimeout(() => setCopiedColor(false), 1000)
        }
    };

    return (
        <>
            <div className="h-24 hover:scale-105 duration-300 rounded-md flex flex-col items-center justify-between overflow-hidden" style={{ background: rgb }}>
                <div className="w-full bg-white bg-opacity-50 backdrop-blur-md  p-1 flex items-center justify-between mt-auto">
                    <button onClick={handleCopyToClipboard} className=" w-full text-black/80 font-medium text-xs uppercase flex items-center justify-between duration-300">
                        {copiedColor ? "Copied" : hexValue}
                        <div className="text-gray-700 h-6 w-6 flex items-center justify-center rounded-md hover:bg-gray-200">
                            <Copy size={12} className="" />
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ColorList