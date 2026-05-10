import {useEffect, useState} from "react";
import {prepareLineChartData} from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";

const IncomeOverview = ({transactions}) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareLineChartData(transactions);
        console.log(result);
        setChartData(result);
        return () => {
        };
    }, [transactions]);
    return (


        <div className="mt-2">
            {/*create line chart*/}
            <CustomLineChart data={chartData}
            type="income"/>

        </div>

    )
}
export default IncomeOverview;