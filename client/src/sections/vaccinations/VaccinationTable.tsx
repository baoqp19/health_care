import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Table, Tag } from "antd";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import useVaccinationColumns from "./VaccinationColumn";
import { useVaccinations } from "../../api/vaccinations/get-vaccination";



export const VaccinationTable  = () => {
  const columns = useVaccinationColumns();
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const { data: vaccinations, isLoading } = useVaccinations({ page, size: ROW_PER_PAGE, keyword });


  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(vaccinations) ? vaccinations : []} // 
        size="middle"
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
