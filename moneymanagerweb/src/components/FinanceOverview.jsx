import {formatCurrency} from "../util/util.js";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview =({totalBalance,totalIncome,totalExpense}) =>{
    const COLOURS = [
        "#59168B", // Balance - Purple
        "#016630", // Income - Green
        "#a0090e"  // Expense - Red
    ];

    const balanceData=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense},
    ]
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="mb-5">
                <h5 className="text-lg font-semibold text-gray-800">Finance Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={formatCurrency(totalBalance)}
                colours={COLOURS}
                showTextAnchor

            />

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">

                {balanceData.map((item, index) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2"
                    >

                        {/* Color Dot */}
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLOURS[index] }}
                        />

                        {/* Label */}
                        <p className="text-sm text-gray-600 font-medium">
                            {item.name}
                        </p>

                    </div>
                ))}
            </div>

        </div>

    )
}
export default FinanceOverview;