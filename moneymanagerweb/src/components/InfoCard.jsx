import {formatCurrency} from "../util/util.js";

const InfoCard = ({icon,label,value,colour}) => {
    return (
        <div className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${colour} rounded-full`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-500">
                    {label}
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                    {formatCurrency(value)}
                </h3>
            </div>

        </div>
    )
}
export default InfoCard;