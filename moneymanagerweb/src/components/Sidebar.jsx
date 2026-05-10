import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const {user}=useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-5 sticky top-[64px] z-20">
            <div className="flex flex-col items-center gap-3 mb-6">
                {user?.profileImgUrl?(
                    <img src={user?.profileImgUrl || "" } alt="profile image" className="w-16 h-16 rounded-full object-cover border border-gray-200"/>
                ):(
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                )}
                <h5 className="text-sm font-semibold text-gray-800">
                    {user?.fullName || ""}
                </h5>
            </div>
            {SIDE_BAR_DATA.map((item,index)=>(
                <button
                    onClick={()=>navigate(item.path)}
                    key={`menu_${index}`}
                    className={` cursor-pointer w-full flex items-center gap-3 text-sm py-2 px-3 rounded-md mb-1 transition ${activeMenu==item.label? "bg-green-600 text-white font-medium":"text-gray-700 hover:bg-gray-100"}`}>
                    <item.icon className="text-xl"/>
                    {item.label}

                </button>
            ))}
        </div>
    )

}
export default Sidebar;