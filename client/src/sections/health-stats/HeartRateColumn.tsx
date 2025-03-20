import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { HealthStat, useHealthStatsStore } from "../../stores/health-stats/healthStatStore";
import { ColumnType } from "antd/es/table";
import { useDeleteHealthStat } from "../../api/health-stats/delete-health-stat";

const useHeartRateColumns = () => {
  const { t } = useTranslation();

  const { setOpenUpdateModal, setHealthStat } = useHealthStatsStore((state) => state);

  const mutateDelete = useDeleteHealthStat({
    onSuccess: () => {
      message.success("Delete health status successfully");
    },
    onError: (error: Error) => {
      message.error(`Delete health status failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (healthStat: HealthStat) => {
    setHealthStat(healthStat);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<HealthStat>[]>(
    () => [
      {
        title: t("No."),
        dataIndex: "No.",
        key: "index",
        align: "center",
        width: 60,
        render: (text, record, index) => index + 1, // Tính chỉ mục tự động
      },
      // {
      //   title: t("ID"),
      //   dataIndex: "statID",
      //   key: "statID",
      //   align: "center",
      // },
      {
        title: t("Value"),
        dataIndex: "statValue",
        key: "statValue",
        align: "center",
        render: (value) => `${value} bpm`, // Thêm đơn vị mmHg sau giá trị
      },
      {
        title: t("Date"),
        dataIndex: "date",
        key: "date",
      },
      {
        title: t("Action"),
        key: "action",
        align: "center",
        width: 140,
        render: (_, healthStat) => (
          <Space>
            <Button
              onClick={() => handleEdit(healthStat)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the health status"
              description="Are you sure to delete this health status?"
              onConfirm={() => handleDelete(healthStat.statID)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
  return columns
};

export default useHeartRateColumns;