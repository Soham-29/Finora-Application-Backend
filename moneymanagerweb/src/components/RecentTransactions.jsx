import {ArrowRight} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({transactions,onMore}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">Recent Transactions</h4>
                <p className="text-sm text-gray-500 mt-1">
                    Latest income and expense activities.
                </p>
                {/*<button className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition cursor-pointer" onClick={onMore}>*/}
                {/*    More <ArrowRight className="text-base" size={16}/>*/}
                {/*</button>*/}

            </div>
            <div className="mt-5 space-y-3">
                {transactions?.slice(0,5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteButton
                    />
                ))}

            </div>
            {/* Empty State */}
            {transactions?.length === 0 && (
                <div className="flex items-center justify-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50 mt-5">
                    <p className="text-sm text-gray-500">
                        No recent transactions found.
                    </p>
                </div>
            )}
        </div>
    )
}
export default RecentTransactions;