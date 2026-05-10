import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import {User, X, Menu, LogOut} from "lucide-react";
import Sidebar from "./Sidebar.jsx";

const Menubar =({activeMenu})=>{
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropDownRef = useRef(null);
    const {user,clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside=(event)=>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropdown(false);
            }
        }
        if (showDropdown){
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[showDropdown])


    return (
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 shadow-sm py-4 px-4 sm:px-7 sticky top-0 z-30">
            {/*Left Side Menu Button and Title*/}
            <button
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                {openSideMenu ? (
                    <X className="text-2xl"/>
                ):(
                    <Menu className="text-2xl"/>
                )}

            </button>
            <div className="flex items-center gap-3">
                <img src={assets.logo} alt="logo" className="w-12 h-12 object-contain"/>
                <span className="text-2xl font-bold text-gray-800 tracking-tight">Finora</span>
            </div>



            {/*Right Side - Profile Pic*/}
            <div className="relative" ref={dropDownRef}>
                <button
                    onClick={()=> setShowDropdown(!showDropdown)}

                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition focus:outline-none focus:ring-1 focus:ring-gray-300">
                    <User className="text-gray-600"/>
                </button>

                {/*Dropdown Menu*/}
                {showDropdown && (
                    <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                        {/*User information*/}
                        <div className="px-4 py-3 border-b border-gray-100 space-y-0.5">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-gray-600"/>
                                </div>
                                <div className="flex-1 ">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {user?.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 break-all">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/*Dropdown options*/}
                        <div className="py-1">
                            <button
                            onClick={handleLogout}
                                className="group flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition">
                                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-gray-800"/>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/*Mobile side menu*/}
            {openSideMenu && (
                <div className="fixed top-[64px] left-0 w-64 h-full bg-white border-r border-gray-200 lg:hidden z-30">
                    <Sidebar activeMenu={activeMenu}/>
                </div>
            )}
        </div>
    )
}

export default Menubar;