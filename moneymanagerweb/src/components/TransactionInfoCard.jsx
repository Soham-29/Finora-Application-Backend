import {Trash2, TrendingDown, TrendingUp, UtensilsCrossed, Wallet} from "lucide-react";
import {formatCurrency} from "../util/util.js";

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteButton, onDelete}) => {
    const getAmountStyles = () => type === "income" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"


    return (
        <div
            className="group flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition">
            <div className={`w-10 h-10 flex items-center justify-center ${type === "income" ? "bg-green-50" : "bg-red-50"} rounded-full`}>
                {icon ? (
                    <img src={icon} alt={title} className="w-5 h-5"/>
                ) : (
                    <Wallet className= {`w-4 h-4 ${type === "income" ? "text-green-600" : "text-red-600"}`}/>
                )}
            </div>
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-500 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteButton && (
                        <button
                            onClick={onDelete}
                            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                            <Trash2 size={18}/>

                        </button>

                    )}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md ${getAmountStyles()}`}>
                        <h6 className="text-xs font-medium">
                            {type === "income" ? '+' : '-'} {formatCurrency(amount)}
                        </h6>
                        {type === "income" ? (
                            <TrendingUp className="w-4 h-4"/>
                        ):(<TrendingDown className="w-4 h-4"/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TransactionInfoCard;