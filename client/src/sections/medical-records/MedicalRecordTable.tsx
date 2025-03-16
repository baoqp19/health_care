import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedicalrecords } from "../../api/medicalRecords/get-medical-records";
import useMedicalRecordColumns from "./MedicalRecordColumns";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: medicalRecords, isLoading } = useMedicalrecords({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(medicalRecords) ? medicalRecords : []}
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
              placeholder="Search medical record..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};