import { Layout } from 'antd';
const { Footer } = Layout;

const FooterLayout = () => {
    return (
        <Footer
            style={{ textAlign: "center" }}
          
        >
            Copyright © {new Date().getFullYear()} Created by <span className="font-bold">baodev</span>
        </Footer>
    )
}

export default FooterLayout