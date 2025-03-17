import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMedication } from "../../api/medication/delete-medication";
import { Medication, useMedicationsStore } from "../../stores/medications/medicationStore";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";


const useMedicationColumns = () => {

  const { t } = useTranslation();

  const { setOpenUpdateModal, setMedication } = useMedicationsStore((state) => state);

  const mutateDelete = useDeleteMedication({
    onSuccess: () => {
      message.success("Delete medication successfully");
    },
    onError: (error) => {
      message.error(`Delete medication failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (medication: Medication) => {
    setMedication(medication);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<Medication>[]>(
    () => [
      {
        title: t("ID"),
        dataIndex: "medicationID",
        key: "medicationID",
        align: "center",
      },
      {
        title: t("MedicationPage.Medication Name"),
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: t("MedicationPage.Frequency"),
        dataIndex: "frequency",
        key: "frequency",
      },
      {
        title: t("MedicationPage.Start Date"),
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: t("MedicationPage.End Date"),
        dataIndex: "endDate",
        key: "endDate",
        render: (text: string | null) => text || "None",
      },
      {
        title: t("MedicationPage.Note"),
        dataIndex: "note",
        key: "note",
        render: (text: string | null) => text || "None",
      },
      {
        title: t("Action"),
        key: "action",
        render: (_, medication) => (
          <Space>
            <Button
              onClick={() => handleEdit(medication)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the medication"
              description="Are you sure to delete this medication?"
              onConfirm={() => handleDelete(medication.medicationID)}
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

export default useMedicationColumns;