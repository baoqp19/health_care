import {
    DashboardOutlined,
    UserOutlined,
    ContactsOutlined
} from "@ant-design/icons";


const menuAdminConfig = () => {
    const menuItems = [
        {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            path: "/admin",
        },
        {
            key: "b",
            icon: <UserOutlined />,
            label: "Users",
            path: "/admin/users",
        },
        {
            key: "c",
            icon: <ContactsOutlined />,
            label: "Contacts",
            path: "/admin/contacts",
        }
    ];
    return menuItems;
}

export default menuAdminConfig