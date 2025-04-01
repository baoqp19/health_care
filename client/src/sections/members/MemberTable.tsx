import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Table, Tag } from "antd";
import useMemberColumns from "./MemberColum";
import { ROW_PER_PAGE } from "../../config/constants";
import { useMembers } from "../../api/members/get-members";
import { useState } from "react";



export const MemberTable = () => {
  const columns = useMemberColumns();
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const { data: members, isLoading } = useMembers({ page, size: ROW_PER_PAGE, keyword });

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(members) ? members : []} // 
        size="middle"
        rowKey={(record) => record.memberID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: 4,

          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search employee..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};
