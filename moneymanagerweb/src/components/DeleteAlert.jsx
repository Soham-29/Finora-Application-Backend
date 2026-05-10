import {useState} from "react";
import {LoaderCircle} from "lucide-react";

const DeleteAlert = ({content, onDelete,onClose}) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        }finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-sm text-gray-700">
                {content}
            </p>
            <div className="flex justify-end gap-2 mt-6">
                {/* Cancel */}
                <button
                    onClick={onClose}
                    type="button"
                    className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                {/* Delete */}
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            Deleting...
                        </>
                    ):(<>Delete</>)}
                </button>

            </div>
        </div>
    )
}
export default DeleteAlert;