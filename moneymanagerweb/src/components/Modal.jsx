import {X} from "lucide-react";

const Modal=({isOpen,onClose,children,title})=>{
    if(!isOpen){return null};
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4">
                {/*Modal header*/}
                <div className="relative  bg-white rounded-xl shadow-2xl border border-gray-100">
                    {/*Modal content*/}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t-xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h3>

                        <button
                            onClick={onClose}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transitio">
                            <X className="w-4 h-4"/>
                        </button>
                    </div>

                    {/*Modal Body*/}
                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Modal;