import {Download, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const ExpenseList=({transactions,onDelete,onDownload,onEmail})=>{

    const[loading,setLoading]=useState(false);
    const handleEmail=async ()=>{
        setLoading(true);
        try {
            await onEmail();

        }finally {
            setLoading(false);
        }
    }
    const handleDownload=async ()=>{
        setLoading(true);
        try {
            await onDownload();
        }finally {
            setLoading(false);
        }

    }

    return ( <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-gray-800">Expense Sources</h5>
            <div className="flex items-center justify-end gap-2">
                <button
                    disabled={loading}
                    onClick={handleEmail}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-gray-200 rounded-md text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>Emailing...
                        </>
                    ) :(
                        <>
                            <Mail size={15} className="w-4 h-4 "/>Email
                        </>
                    )}
                </button>
                <button
                    disabled={loading}
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-gray-200 rounded-md text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition cursor-pointer">
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin"/>Downloading...
                        </>
                    ) :(
                        <>
                            <Download size={15} className="w-4 h-4 "/>Download
                        </>
                    )}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/*Display the expenses*/}
            {transactions?.map((expense)=>(
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('Do MMMM YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={()=>onDelete(expense.id)}
                    />
                )

            )}

        </div>
    </div>)
}
export default ExpenseList;