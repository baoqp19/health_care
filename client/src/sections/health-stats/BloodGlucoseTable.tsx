import { ExportOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Table, Tag } from "antd";
import dayjs from "dayjs";
import useBloodGlucoseColumns from "./BloodGlucoseColumn";
import { useHealthStats } from "../../api/health-stats/get-health-stat";

export interface BloodGlucoseTableParams {
  selectedMemberId?: number;
  selectedStatType?: string;
  date?: string;
  onDateChange: (newDate: string) => void
}

const BloodGlucoseTable = ({ selectedMemberId, selectedStatType, date, onDateChange }: BloodGlucoseTableParams) => {
  const columns = useBloodGlucoseColumns();

  const { data: healthStats, isLoading } = useHealthStats({ selectedMemberId, selectedStatType, date });

  return (
    <>
      <Flex>
        <Table
          style={{ width: '100%', maxWidth: 560 }}
          columns={columns}
          dataSource={healthStats}
          size="middle"
          pagination={false}
          scroll={{ x: 500, y: 300 }}
          tableLayout="fixed"
          loading={isLoading}
          title={() => (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DatePicker
                placeholder="Select date..."
                format="YYYY-MM-DD"
                allowClear //Xóa ngày => reset về rỗng
                onChange={(selectedDate) => {
                  // Chuyển thành chuỗi định dạng trước khi lưu
                  const dateString = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "";
                  onDateChange(dateString);
                }}
              />
              <Button icon={<ExportOutlined />}>
                Export <Tag color="blue">Coming Soon</Tag>
              </Button>
            </div>
          )}
        />
      </Flex>

    </>
  );
};

export default BloodGlucoseTable;