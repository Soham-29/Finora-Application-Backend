import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus} from "lucide-react";
import Modal from "../components/Modal.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }


        } catch (err) {
            console.error("Failed to fetch expense details.", err);
            toast.error(err.response?.data?.message || "Failed to fetch expense details.");

        } finally {
            setLoading(false);
        }
    }


    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (e) {
            console.error("Failed to fetch expense categories.", e);
            toast.error(e.response?.data?.message || "Failed to fetch expense categories");

        }
    }
    //save income
    const handleAddExpense = async (expense) => {
        const {name, amount, date, icon, categoryId} = expense;
        if (!name.trim()) {
            toast.error("Please enter expense name");
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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSES, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully.");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }

        } catch (e) {
            console.error("Error adding expense", e)
            toast.error(e.response?.data?.message || "Failed to add expense");

        }
    }
    //delete expense
    const deleteExpense = async (id) => {

        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSES(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense deleted successfully.");
            fetchExpenseDetails();


        } catch (error) {
            console.error("Failed to delete expense", error);
            toast.error(error.response?.data?.message || "Failed to delete expense");

        }

    }

    const handleDownloadExpenseDetails=async ()=>{

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:"blob"});
            const now = new Date();

            const timestamp =
                `${now.getFullYear()}` +
                `${String(now.getMonth() + 1).padStart(2, "0")}` +
                `${String(now.getDate()).padStart(2, "0")}-` +
                `${String(now.getHours()).padStart(2, "0")}` +
                `${String(now.getMinutes()).padStart(2, "0")}` +
                `${String(now.getSeconds()).padStart(2, "0")}`;

            const fileName = `expense-report-${timestamp}.xlsx`;
            const url=window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href=url;
            link.setAttribute("download",fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloaded expense details successfully.");

        }catch (error){
            console.error("Failed to download expense details", error);
            toast.error(error.response?.data?.message || "Failed to download expense");

        }
    }
    const handleEmailExpenseDetails=async ()=>{
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_SEND_EXCEL_EMAIL);
            if(response.status === 200) {
                toast.success("Email sent successfully for expense details.");
            }

        }catch (error) {
            console.error("Failed to send expense details email", error);
            toast.error(error.response?.data?.message || "Failed to send expense details email");

        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Expense Details
                        </h2>

                        <button
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
                            onClick={() => setOpenAddExpenseModal(true)}
                        >
                            <Plus size={16}/>
                            Add Expense
                        </button>

                    </div>
                    <div className="mb-6">
                        <ExpenseOverview transactions={expenseData}/>
                    </div>

                    <ExpenseList transactions={expenseData}
                                onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                                onDownload={handleDownloadExpenseDetails}
                                onEmail={handleEmailExpenseDetails}
                    />
                    {/*Adding Income Modal*/}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>
                    {/*Delete Expense*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete expense"
                    >
                        <DeleteAlert
                            content={`Are you sure you want to delete this expense ?`}
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                            onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;