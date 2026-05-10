import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import {formatCurrency} from "../util/util.js";

const CustomPieChart = ({
                            data,
                            label,
                            totalAmount,
                            colours,
                            showTextAnchor
                        }) => {

    return (
        <div className="w-full h-[320px] relative">

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={110}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colours[index % colours.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            {showTextAnchor && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

                    <p className="text-sm text-gray-500">
                        {label}
                    </p>

                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                        {totalAmount}
                    </h3>

                </div>
            )}
        </div>
    );
};

export default CustomPieChart;