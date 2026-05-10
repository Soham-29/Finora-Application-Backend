import logo from './logo.png';
import create_acc_bg from './create_acc_bg.png';
import {Coins, Filter, FunnelPlus, Layers, LayoutDashboard, List, TrendingDown, TrendingUp, Wallet} from "lucide-react";

export const assets = {
    logo,
    create_acc_bg,
}

export const SIDE_BAR_DATA=[
    {
        id:"01",
        label:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard",
    },
    {
        id:"02",
        label:"Categories",
        icon:Layers,
        path:"/category",
    },
    {
        id:"03",
        label:"Income",
        icon:TrendingUp,
        path:"/income",
    },
    {
        id:"04",
        label:"Expense",
        icon:TrendingDown,
        path:"/expense",
    },
    {
        id:"05",
        label:"Filters",
        icon:Filter,
        path:"/filter",
    }
]