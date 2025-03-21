import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import PageHeader from "../../components/page-header";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { useMedicationsStore } from "../../stores/medications/medicationStore";
import MedicationTable from "../../sections/medications/MedicationTable";
import CreateMedicationModal from "../../sections/medications/CreateMedicationModal";
import UpdateMedicationModal from "../../sections/medications/UpdateMedicationModal";
import { useTranslation } from "react-i18next";

const MedicationPage = () => {

  const { t } = useTranslation();

  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMedicationsStore((state) => state);

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
          heading={t("Medications")}
          links={[{ title: t("Dashboard"), href: "/manager" }, { title: t("Medications") }]}
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
        <MedicationTable />
      </div>
      <ConfirmModal
        title={`Are you sure to delete Medication ?`}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />
      <CreateMedicationModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMedicationModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMedication={null}
      />
    </>
  );
};
export default MedicationPage;