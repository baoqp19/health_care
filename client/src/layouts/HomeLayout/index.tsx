import { Button, Layout, Space, Typography } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { GithubOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import { useAuthStore } from "../../stores/auth/authStore";
import LanguageSwitcher from "../../components/languageSwitcher";
import { useTranslation } from "react-i18next";

const { Header } = Layout;




const HomeLayout = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { t } = useTranslation();

  return (
    <Layout className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Header className="flex justify-between items-center bg-white shadow-md px-4 md:px-8">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-xs md:text-2xl font-bold ml-2 text-green-600">
            FamilyHealth
          </span>
        </div>
        <div>
          <Space>
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
                onClick={() => navigate("/manager")}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 transition-colors duration-300"
                onClick={() => navigate("/auth/login")}
              >
                {t("LandingPage.Login")}
              </Button>
            )}
          </Space>
        </div>
      </Header>
      <Content className="p-4 md:p-8 lg:p-16">
        <Outlet />
      </Content>
      <Footer className="text-center bg-white py-4 md:py-8">
        <div className="mb-4">
          <Space size="large">
            <GithubOutlined href='https://github.com/baoqp19' className="text-xl md:text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
            <TwitterOutlined href='https://x.com/baodev' className="text-xl md:text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
            <FacebookOutlined href='https://www.facebook.com/pqbao.05' className="text-xl md:text-2xl hover:text-blue-500 transition-colors duration-300 cursor-pointer" />
          </Space>
        </div>
        <Typography.Text className="text-gray-600 text-sm md:text-base">
          Ant Design ©{new Date().getFullYear()} Created by{" "}
          <span className="font-bold">baodvev</span>
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
