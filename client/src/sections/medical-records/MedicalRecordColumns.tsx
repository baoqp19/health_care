import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MedicalRecord, useMedicalRecordsStore } from "../../stores/medical-records/medicalRecordStore";
import { useDeleteMedicalRecord } from "../../api/medicalRecords/delete-medical-records";
import { ColumnType } from "antd/es/table";

const useMedicalRecordColumns = () => {
  const { setOpenUpdateModal, setMedicalRecord } = useMedicalRecordsStore((state) => state);

  const mutateDelete = useDeleteMedicalRecord({
    onSuccess: () => {
      message.success("Deleted medical record successfully");
    },
    onError: (error) => {
      message.error(
        `Failed to delete medical record. Reason: ${error.message}`
      );
    },
  });

  const handleEdit = (medicalRecord: MedicalRecord) => {
    setMedicalRecord(medicalRecord);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<MedicalRecord>[]>(
    () => [
      {
        title: "#ID",
        dataIndex: "recordID",
        key: "recordID",
        align: "center",
      },
      {
        title: "#MemberID",
        dataIndex: "memberID",
        key: "memberID",
        align: "center",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
      },
      {
        title: "Symptoms",
        dataIndex: "symptoms",
        key: "symptoms",
      },
      {
        title: "Diagnosis",
        dataIndex: "diagnosis",
        key: "diagnosis",
      },
      {
        title: "Treatment",
        dataIndex: "treatment",
        key: "treatment",
      },
      {
        title: "Facility name",
        dataIndex: "facilityName",
        key: "facilityName",
      },
      {
        title: "Action",
        key: "action",
        render: (_, medicalRecord) => (
          <Space>
            <Button
              onClick={() => handleEdit(medicalRecord)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Remove medical record"
              description="Are you sure to remove this medical record ?"
              onConfirm={() => handleDelete(medicalRecord.recordID)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );
  return columns
};

export default useMedicalRecordColumns;