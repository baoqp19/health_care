import {
    BarChartOutlined,
    CalendarOutlined,
    DashboardOutlined,
    ExclamationCircleOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    HeartOutlined,
    MedicineBoxOutlined,
    QuestionCircleOutlined,
    RobotOutlined,
    SettingOutlined,
    SolutionOutlined,
    UserOutlined
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

const MenuConfig = () => {
    const { t } = useTranslation();


    const menuItems = [
        {
            key: "1",
            icon: <DashboardOutlined />,
            label: t("Dashboard"),
            path: "/manager",
        },
        {
            key: "2",
            icon: <UserOutlined />,
            label: t("Members"),
            path: "/manager/members",
        },
        {
            key: "3",
            icon: <FileTextOutlined />,
            label: t("Medical Records"),
            path: "/manager/medical-records",
        },
        {
            key: "4",
            icon: <SolutionOutlined />,
            label: t("Documents"),
            path: "/manager/documents",
        },
        {
            key: "5",
            icon: <CalendarOutlined />,
            label: t("Appointments"),
            path: "/manager/appointments",
        },
        {
            key: "6",
            icon: <MedicineBoxOutlined />,
            label: t("Medications"),
            path: "/manager/medications",
        },
        {
            key: "7",
            icon: <ExclamationCircleOutlined />,
            label: t("Emergency Contacts"),
            path: "/manager/emergency-contacts",
        },
        {
            key: "8",
            icon: <FileSearchOutlined />,
            label: t("Allergies"),
            path: "/manager/allergies",
        },
        {
            key: "9",
            icon: <CalendarOutlined />,
            label: t("Vaccinations"),
            path: "/manager/vaccinations",
        },
        {
            key: "9q0",
            icon: <SettingOutlined />,
            label: t("Account Settings"),
            path: "/manager/account-settings",
        },
        {
            key: "11",
            icon: <BarChartOutlined />,
            label: t("Reports & Stats"),
            path: "/manager/reports-stats",
        },
        {
            key: "12",
            icon: <QuestionCircleOutlined />,
            label: t("Help & Support"),
            path: "/manager/help-support",
        },
        {
            key: "13",
            icon: <RobotOutlined />,
            label: t("ChatAi"),
            path: "/manager/chat-ai",
        },
        {
            key: "14",
            icon: <HeartOutlined />,
            label: t("Health Stats"),
            path: "/manager/health-stats",
        }
    ];
    return menuItems;
}

export default MenuConfig;