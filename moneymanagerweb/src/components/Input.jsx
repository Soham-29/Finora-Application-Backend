import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

const Input = ({label, value, onChange, placeholder, type,isSelect,options}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
                {label}
            </label>
            <div className="relative">
                {isSelect?(
                    <select
                        className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    value={value}
                    onChange={(e) => onChange(e)}>

                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}

                    </select>
                ):(
                    <input
                        className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 pr-12 text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 transition placeholder:text-gray-400"
                        type={type === "password" ? (showPassword ? "text" : "password") : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}/>
                )}

                {type === "password" && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10" onClick={toggleShowPassword}>
                        {
                            showPassword ? (
                                    <Eye
                                        key="eye-open"
                                        size={20}
                                        className="text-gray-600 hover:text-gray-800"
                                        />
                                ) :
                                (
                                    <EyeOff
                                        key="eye-close"
                                        size={20}
                                        className="text-gray-400 hover:text-gray-600"
                                        />
                                )
                        }
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input;