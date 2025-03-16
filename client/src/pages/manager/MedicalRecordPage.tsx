import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useMedicalRecordsStore } from "../../stores/medical-records/medicalRecordStore";
import PageHeader from "../../components/page-header";
import { MedicalRecordTable } from "../../sections/medical-records/MedicalRecordTable";
import ConfirmModal from "../../components/modals/ConfirmModal";
import CreateMedicalRecordModal from "../../sections/medical-records/CreateMedicalRecordModal";
import UpdateMedicalRecordModal from "../../sections/medical-records/UpdateMedicalRecordModal";

const MedicalRecordPage = () => {
  
  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMedicalRecordsStore((state) => state);

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleCreateCancel = () => {
    setOpenCreateModal(false);
  };

  const handleUpdateCancel = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Medical records"
          links={[{ title: "DashBoard", href: "/medical-records" }, { title: "Medical record" }]}
        />
        <Space>
          <Button
            onClick={handleCreate}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            Add
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <MedicalRecordTable />
      </div>
      <ConfirmModal
        title={`Are you sure to delete this medical record ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />
      <CreateMedicalRecordModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMedicalRecordModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMedicalRecord={null}
      />
    </>
  );
};
export default MedicalRecordPage;