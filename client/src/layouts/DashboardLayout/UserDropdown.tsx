import { Avatar, Dropdown } from "antd";
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../stores/auth/authStore";



const UserDropdown = () => {

    const items = [
        {
            key: "1",
            label: "Account info",
            icon: <UserOutlined />,
        },
        {
            key: "2",
            label: "Settings",
            icon: <SettingOutlined />,
        },
        {
            key: "3",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: () => {
                localStorage.removeItem("refresh_token");
                useAuthStore.getState().clearUser(); // Gọi `clearUser()`
                window.location.href = "/auth/login"; // Điều hướng về trang login
            },
        }
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={["click"]}  // nhấn chuột mới mở 
            placement="bottomLeft"
            arrow
        >
            <Avatar
                size="default"
                src={"https://avatars.githubusercontent.com/u/120194990?v=4"}
                className="cursor-pointer"
            />
        </Dropdown>
    );
};

export default UserDropdown;
