import {useRef, useState} from "react";
import {Trash, Upload, User} from "lucide-react";

const ProfilePhotoSelector = ({image, setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImg = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);

        if (inputRef.current) {
            inputRef.current.value = ""; // to clean  file input which still has previous value
        }
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex flex-col items-center mb-3">
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImgChange} className="hidden"/>
            {!image ? (
                <div className="relative">
                    <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
                        <User className="text-green-600" size={32}/>
                    </div>
                    {/* Upload button */}
                    <button
                        type="button"
                        onClick={onChooseFile}
                        className="absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition">
                        <Upload size={14}/>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-green-500"/>
                    {/* Remove button */}
                    <button
                        type="button"
                        onClick={handleRemoveImg}
                        className="absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition">
                        <Trash size={14}/>
                    </button>
                </div>
            )}
            {/* Label */}
            <p className="text-xs text-gray-500 mt-1">
                Upload profile photo (optional)
            </p>
        </div>
    )
}
export default ProfilePhotoSelector;