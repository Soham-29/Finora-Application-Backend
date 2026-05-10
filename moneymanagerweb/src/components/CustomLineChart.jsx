import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { formatCurrency } from "../util/util.js";

const CustomLineChart = ({ data,type }) => {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;

            return (
                <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm">
                    <p className="text-sm font-medium text-gray-800">
                        {item.month}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        Total: <span className="font-semibold text-green-600">
                            {formatCurrency(item.totalAmount)}
                        </span>
                    </p>

                    {item.items?.map((i, index) => (
                        <p key={index} className="text-xs text-gray-500 mt-1">
                            {i.name}: {formatCurrency(i.amount)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h5 className="text-lg font-semibold text-gray-800 mb-1">
                {type === "income" ? (
                    <>Income Overview</>
                ) : (
                    <>Expense Overview</>
                )}
            </h5>
            <p className="text-sm text-gray-500 mb-4">
                {type === "income" ? (
                    <>Track your earnings over time</>
                ) : (
                    <>Track your spending over time</>
                )}
            </p>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Line
                            type="monotone"
                            dataKey="totalAmount"
                            stroke={type === "income" ? "#16a34a" : "#dc2626"}
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomLineChart;