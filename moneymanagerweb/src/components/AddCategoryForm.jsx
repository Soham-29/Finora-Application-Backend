import {useEffect, useState} from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import {LoaderCircle} from "lucide-react";

const AddCategoryForm = ({onAddCategory,initialCategoryData,isEditing}) => {
    const [category, setCategory] = useState({
        name:"",
        type:"income",
        icon:""
    })
        const categoryTypeOptions=[
            {value: 'income',label: 'Income'},
            {value: 'expense',label: 'Expense'}
        ]
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }
        else {
            setCategory({name:"",type: "income",icon:""});
        }
    },[isEditing,initialCategoryData])
    const handleChange=(key,value)=>{
        setCategory({...category,[key]:value})
    }
    const handleSubmit=async ()=>{
        setLoading(true);
        try {
           await onAddCategory(category);
        }finally{
            setLoading(false);
        }
    }
        return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
            />
            <Input
            value={category.name}
            onChange={({target}) => handleChange("name",target.value)}
            label="Name"
            placeholder="e.g. Salary, Groceries"
            type="text"
            />
            <Input
            label="Category Type"
            value={category.type}
            onChange={({target}) => handleChange("type",target.value)}
            isSelect={true}
            options={categoryTypeOptions}/>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading?(
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>
                            <span>{isEditing?"Updating...":"Adding..."}</span>
                        </>
                    ):(
                        <>
                        {isEditing?"Update Category":"Add Category"}
                        </>

                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;