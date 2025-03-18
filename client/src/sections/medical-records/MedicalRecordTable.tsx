import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useMedicalrecords } from "../../api/medicalRecords/get-medical-records";
import useMedicalRecordColumns from "./MedicalRecordColumns";
import { useMembers } from "../../api/members/get-members";

export const MedicalRecordTable = () => {
  const columns = useMedicalRecordColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: medicalRecords, isLoading } = useMedicalrecords({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  const { data: members } = useMembers({})
  const memberMap = Array.isArray(members)
    ?
    members.reduce((map, member) => {
      map[member.memberID] = member.fullName;
      return map;
    }, {})
    : {};

  const dataSource = Array.isArray(medicalRecords)
    ? medicalRecords.map(medicaReocrd => ({
      ...medicaReocrd,
      memberName: memberMap[medicaReocrd.memberID] || "",
    }))
    : [];


  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="middle"
        rowKey={(record) => record.recordID}
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