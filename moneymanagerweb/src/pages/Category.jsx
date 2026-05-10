import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();

    const[loading, setLoading] = useState(false);
    const[categoryData, setCategoryData] = useState([]);
    const[openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const[openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const[selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        if(loading){
            return;
        }
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                console.log("Categories",response.data);
                setCategoryData(response.data);
            }
        }catch (error){
            console.error("Something went wrong.Please try again.",error);
            toast.error(error.message);

        }finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    },[]);

    const handleAddCategory= async (category)=>{
        const{name,type,icon} = category;
        if(!name.trim()){
            toast.error("Category name is required");
            return;
        }
        //Check if category already exists
        const doesCategoryExists=categoryData.some((category)=>{
           return  category.name.toLowerCase()===name.trim().toLowerCase();
        })
        if(doesCategoryExists){
            toast.error("Category already exists");
            return;
        }
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
            if(response.status === 201){
                toast.success("Category added successfully.");
                setOpenAddCategoryModal(false);
                fetchCategories();
            }

        }catch(error){
            console.error("Error adding category: ",error);
            toast.error(error.response?.data?.message || "Failed to add category.");


        }
    }
    const handleEditCategory=  (categoryToEdit)=>{
       setSelectedCategory(categoryToEdit);
       setOpenEditCategoryModal(true);
    }
    const handleUpdateCategory = async (updateCategory)=>{
       const {id,name,type,icon }=updateCategory;
        if(!name.trim()){
            toast.error("Category name is required");
            return;
        }
        if(!id){
            toast.error("Category id is missing for update");
            return;
        }

        try {
               await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});

                setOpenEditCategoryModal(false)
                setSelectedCategory(null);
                toast.success("Category updated successfully.");
                fetchCategories()




        }catch(error){
            console.error("Error updating category: ",error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category.");

        }

    }

    return (
        <Dashboard activeMenu="Categories">
            <div className="p-6">
                {/*Button to add category*/}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-gray-800">All Categories</h2>
                    <button
                        onClick={()=>setOpenAddCategoryModal(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        <Plus size={15}/>
                        Add Category
                    </button>
                </div>

                {/*Category List*/}
                    <CategoryList categories={ categoryData }
                    onEditCategory={handleEditCategory}/>


                {/*Adding category modal*/}
                <Modal title="Add Category"
                       isOpen={openAddCategoryModal}
                       onClose={()=>setOpenAddCategoryModal(false)} >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>

                {/*Updating category modal*/}
                <Modal title="Update Category"
                isOpen={openEditCategoryModal}
                onClose={()=>{
                    setOpenEditCategoryModal(false);
                    setSelectedCategory(null);
                }} >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                    onAddCategory={handleUpdateCategory}
                    isEditing={true}
                    ></AddCategoryForm>
                </Modal>
            </div>
        </Dashboard>
    )

}

export default Category;