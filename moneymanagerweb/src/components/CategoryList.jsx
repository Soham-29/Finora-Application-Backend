import {Bookmark, Layers2, Pencil, Tag} from "lucide-react";

const CategoryList = ({categories,onEditCategory}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Category Sources</h4>
            </div>
            {/*Category List*/}
            {categories.length === 0 ?(
                <p className="text-gray-500">
                    No categories added yet. Add some to get started
                </p>
            ):(
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition">
                            {/*Icon*/}
                            <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-full">
                                {category.icon?(
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="h-5 w-5"/>
                                    </span>
                                ):(
                                    <Tag className="w-4 h-4 text-green-600"/>
                                )}
                            </div>
                            {/*Category details*/}
                            <div className="flex-1 flex items-center justify-between">
                                {/*Category name and type*/}
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">
                                        {category.type}
                                    </p>
                                </div>
                                {/*Action buttons*/}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={()=>onEditCategory(category)}
                                        className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition">
                                        <Pencil className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer"/>
                                    </button>
                                </div>
                            </div>



                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
export default CategoryList;