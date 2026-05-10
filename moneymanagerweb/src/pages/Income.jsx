import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }


        } catch (err) {
            console.error("Failed to fetch income details.", err);
            toast.error(err.response?.data?.message || "Failed to fetch income details.");

        } finally {
            setLoading(false);
        }
    }


    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (e) {
            console.error("Failed to fetch income categories.", e);
            toast.error(e.response?.data?.message || "Failed to fetch income categories");

        }
    }
    //save income
    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;
        if (!name.trim()) {
            toast.error("Please enter income name");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }
        if (!date) {
            toast.error("Please select a date");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Date cannot be in future");
            return;
        }
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully.");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }

        } catch (e) {
            console.error("Error adding income", e)
            toast.error(e.response?.data?.message || "Failed to add income");

        }
    }
    //delete income
    const deleteIncome = async (id) => {

        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income deleted successfully.");
            fetchIncomeDetails();


        } catch (error) {
            console.error("Failed to delete income", error);
            toast.error(error.response?.data?.message || "Failed to delete income");

        }

    }

    const handleDownloadIncomeDetails=async ()=>{

       try {
           const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
           const now = new Date();

           const timestamp =
               `${now.getFullYear()}` +
               `${String(now.getMonth() + 1).padStart(2, "0")}` +
               `${String(now.getDate()).padStart(2, "0")}-` +
               `${String(now.getHours()).padStart(2, "0")}` +
               `${String(now.getMinutes()).padStart(2, "0")}` +
               `${String(now.getSeconds()).padStart(2, "0")}`;

           const fileName = `income-report-${timestamp}.xlsx`;
           const url=window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement("a");
           link.href=url;
           link.setAttribute("download",fileName);
           document.body.appendChild(link);
           link.click();
           link.parentNode.removeChild(link);
           window.URL.revokeObjectURL(url);
           toast.success("Downloaded income details successfully.");

       }catch (error){
           console.error("Failed to download income details", error);
           toast.error(error.response?.data?.message || "Failed to download income");

       }
    }
    const handleEmailIncomeDetails=async ()=>{
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_SEND_EXCEL_EMAIL);
            if(response.status === 200) {
                toast.success("Email sent successfully for income details.");
            }

        }catch (error) {
            console.error("Failed to send income details email", error);
            toast.error(error.response?.data?.message || "Failed to send income details email");
            
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);
    return (
        <Dashboard activeMenu="Income">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Income Details
                        </h2>

                        <button
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
                            onClick={() => setOpenAddIncomeModal(true)}
                        >
                            <Plus size={16}/>
                            Add Income
                        </button>

                    </div>
                    <div className="mb-6">
                        <IncomeOverview transactions={incomeData}/>
                    </div>

                    <IncomeList transactions={incomeData}
                                onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                                onDownload={handleDownloadIncomeDetails}
                                onEmail={handleEmailIncomeDetails}
                    />
                    {/*Adding Income Modal*/}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>
                    {/*Delete Income*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete income"
                    >
                        <DeleteAlert
                            content={`Are you sure you want to delete this income ?`}
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                            onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income;