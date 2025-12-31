import {
    LayoutDashboard,
    FileText
} from "lucide-react";
import AgentDashboardComponent from './AgentDashboardComponent/AgentDashboardComponent';
import ProductListing from './ProductListing/ProductListing';

export interface MenuItemConfig {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
    component: React.ComponentType;
}

export const dashboardMenuItems: MenuItemConfig[] = [
    {
        id: "dashboard",
        label: "Agent Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/dashboard",
        component: AgentDashboardComponent
    },
    {
        id: "product-listing",
        label: "Product Listing",
        icon: <FileText size={20} />,
        path: "/dashboard/product-listing",
        component: ProductListing
    },
];
