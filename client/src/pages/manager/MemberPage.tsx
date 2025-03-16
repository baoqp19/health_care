import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";

import PageHeader from "../../components/page-header";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { MemberTable } from "../../sections/members/MemberTable";
import CreateMemberModal from "../../sections/members/CreateMemberModal";
import UpdateMemberModal from "../../sections/members/UpdateMemberModal";
import { useMembersStore } from "../../stores/members/memberStore";
import { useTranslation } from "react-i18next";


const MemberPage = () => {

  const { t } = useTranslation();

  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMembersStore((state) => state);

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
          heading={t("Members")}
          links={[{ title: t("Dashboard"), href: "/manager" }, { title: t("Members") }]}
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
        <MemberTable />
      </div>
      <ConfirmModal
        title={'t("warning_delete.Member")'}
        content={'Coming Soon'}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />
      <CreateMemberModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMemberModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default MemberPage;
