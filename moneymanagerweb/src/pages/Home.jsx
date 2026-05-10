import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, WalletCards, Wallet, TrendingUp, TrendingDown} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
    useUser();
    const  navigate = useNavigate();
    const[dashboardData, setDashboardData] = useState(null);
    const[loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if(loading){return;}
        setLoading(true);
        try {
            const response=await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if(response.status === 200){
                setDashboardData(response.data);
            }

        }catch(error){
            console.log("Error getting dashboard data", error);
            toast.error("Error getting dashboard data");

        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDashboardData();
        return () => {}
    },[])

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {/*Top cards*/}
                        <InfoCard
                            icon={<Wallet/>}
                            label="Total Balance"
                            value={dashboardData?.totalBalance||0}
                            colour="bg-purple-700"
                        />
                        <InfoCard
                            icon={<TrendingUp/>}
                            label="Total Income"
                            value={dashboardData?.totalIncome||0}
                            colour="bg-emerald-600"
                        />
                        <InfoCard
                            icon={<TrendingDown/>}
                            label="Total Expense"
                            value={dashboardData?.totalExpense||0}
                            colour="bg-red-600"
                        />



                    </div>
                    {/* Main Dashboard Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Recent Transactions */}
                        <div className="xl:col-span-2">
                            <RecentTransactions
                                transactions={dashboardData?.recentTransactions || []}
                                onMore={() => navigate("/expense")}
                            />
                        </div>

                        {/* Finance Overview */}
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />
                    </div>

                    {/* Bottom Transactions Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* Expense Transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Expense || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />

                        {/* Income Transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;