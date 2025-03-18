import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useAppointmentColumns from "./AppointmentColumn";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAppointments } from "../../api/appointments/get-appointment";

export const AppointmentTable = () => {
  const columns = useAppointmentColumns();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data: appointments, isLoading } = useAppointments({
    page,
    size: ROW_PER_PAGE,
    keyword,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(appointments) ? appointments : []}
        size="middle"
        rowKey={(record) => record.appointmentID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: 4,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div className="flex justify-between">
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
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};