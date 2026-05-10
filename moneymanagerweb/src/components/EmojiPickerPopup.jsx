import {useState} from "react";
import {Image, Smile, X} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({icon, onSelect}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick=(emoji)=>{
        onSelect(emoji?.imageUrl||"");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-600 rounded-lg border border-green-100">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12"/>
                    ) : (<Smile className="w-5 h-5 text-green-600"/>)}
                </div>
                <p className="text-sm text-gray-700">
                    {icon ? "Change icon" : "Choose icon"}
                </p>
            </div>
            {isOpen && (
                <div className="relative z-[100]">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute -top-2 -right-2 z-50 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition">
                        <X/>

                    </button>
                    <div className="shadow-lg border rounded-lg">
                        <EmojiPicker
                            open={isOpen}
                            onEmojiClick={handleEmojiClick}
                        />
                    </div>

                </div>
            )}

        </div>
    )
}
export default EmojiPickerPopup;