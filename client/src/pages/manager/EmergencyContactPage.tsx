import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useEmergencyContactStore } from "../../stores/emergencyContacts/emergencyContactStore";
import PageHeader from "../../components/page-header";
import { EmergencyContactTable } from "../../sections/emergencyContacts/EmergencyContactTable";
import ConfirmModal from "../../components/modals/ConfirmModal";
import CreateEmergencyContactModal from "../../sections/emergencyContacts/CreateEmergencyContactModal";
import UpdateEmergencyContactModal from "../../sections/emergencyContacts/UpdateEmergencyContactModal";



const EmergencyContactPage = () => {
  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useEmergencyContactStore((state) => state);

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
          heading="emergencyContacts"
          links={[{ title: "DashBoard", href: "/emergencyContacts" }, { title: "EmergencyContact" }]}
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
        <EmergencyContactTable />
      </div>
      <ConfirmModal
        title={`Are you sure to delete emergency contact ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />

      <CreateEmergencyContactModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />

      <UpdateEmergencyContactModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedContact={null}
      />

    </>
  );
};
export default EmergencyContactPage;