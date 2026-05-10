import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Search} from "lucide-react";
import {useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
    useUser();
    const[type,setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const[keyword, setKeyword] = useState("");
    const[sortField, setSortField] = useState("date");
    const[sortOrder, setSortOrder] = useState("asc");
    const[transactions, setTransactions] = useState([]);
    const[loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS,{
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });

            setTransactions(response.data);
        }catch (error) {
            console.error("Failed to fetch transactions", error);
            toast.error(error.message||"Failed to fetch transactions.");
        }finally {
            setLoading(false);
        }
    }

    return (
        <Dashboard activeMenu="Filters">
            <div className="p-6">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Filter Transactions</h2>
                </div>
                {/* Filter Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <div className="mb-5">
                        <h5 className="text-lg font-semibold text-gray-800">Select Filters</h5>
                        <p className="text-sm text-gray-500 mt-1">
                            Filter and search your transactions easily.
                        </p>
                    </div>
                    <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5"
                                   htmlFor="type">Type</label>
                            <select
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                id="type">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="startDate">
                                Start Date
                            </label>
                            <input
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                type="date"
                                id="startDate"
                                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
        transition appearance-none overflow-hidden"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="endDate">
                                End Date
                            </label>
                            <input
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                type="date"
                                id="endDate"
                                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
        transition appearance-none overflow-hidden"
                            />
                        </div>
                        {/*Sort Field*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sortField">Sort
                                Field</label>
                            <select
                                value={sortField}
                                onChange={e => setSortField(e.target.value)}
                                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                id="sortField">
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>
                        {/* Sort Order*/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sortOrder">Sort
                                Order</label>
                            <select
                                value={sortOrder}
                                onChange={e => setSortOrder(e.target.value)}
                                className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                id="sortOrder">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        {/* Search */}
                        <div className="sm:col-span-2 lg:col-span-1 flex flex-col">
                            <label

                                htmlFor="keyword"
                                className="block text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Search
                            </label>

                            <div className="flex items-center gap-2">
                                <input
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    id="keyword"
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-1 min-w-0 h-[44px] border border-gray-300 rounded-lg px-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-green-500
            focus:border-green-500 transition"
                                />

                                <button
                                    onClick={handleSearch}
                                    type="button"
                                    className="h-[44px] w-[44px] shrink-0 flex items-center justify-center
            bg-green-600 hover:bg-green-700 text-white rounded-lg
            transition cursor-pointer"
                                >
                                    <Search size={18}/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/*Filter results*/}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mt-6">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            View filtered income and expense transactions
                        </p>
                    </div>
                    {transactions.length===0 && !loading?(
                        <div className="flex items-center justify-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500 text-center">Select filters and click search to view transactions</p>
                        </div>
                    ):""}
                    {loading?(
                        <p className="text-gray-500">Loading Transactions...</p>
                    ):("")}
                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format('Do MMM YYYY')}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteButton
                        />
                    ))}

                </div>
            </div>
        </Dashboard>
    )
}

export default Filter;