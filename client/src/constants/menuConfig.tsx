import {
    DashboardOutlined,
    HistoryOutlined,
    UserOutlined
} from "@ant-design/icons";

const menuItems = [
    {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        path: "/manager",
    },
    {
        key: "2",
        icon: <UserOutlined />,
        label: "Members",
        path: "/manager/members",
    },
    {
        key: "3",
        icon: <HistoryOutlined />,
        label: "History",
        path: "/manager/history",
    }
];

export default menuItems;