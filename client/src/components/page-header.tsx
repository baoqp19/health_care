import { Breadcrumb, Space, Typography } from "antd";
import { Link } from "react-router-dom";

type PageHeaderProps = {
  heading: string;
  links: {
    title: string;
    href?: string; // href có thể không có (undefined)
  }[];
};


const PageHeader = ({ heading, links, ...props }: PageHeaderProps) => {
  const breadcrumbItems = links.map((link) => {
    if (link.href) {
      return {
        title: <Link to={link.href}>{link.title}</Link>,
      };
    }
    return {
      title: link.title,
    };
  });

  return (
    <Space direction="vertical" size="small" {...props}>
      <Typography.Title level={4} className="!mb-0">
        {heading}
      </Typography.Title>
      <Breadcrumb items={breadcrumbItems} />
    </Space>
  );
};

export default PageHeader;
