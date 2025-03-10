import { PlusSquareOutlined } from "@ant-design/icons";
import PageHeader from "../../components/page-header";
import { Button, Flex, Space } from "antd";
import { VaccinationTable } from "../../sections/vaccinations/VaccinationTable";
import ConfirmModal from "../../components/modals/ConfirmModal";
import CreateVaccinationModal from "../../sections/vaccinations/CreateVaccinationModal";
import UpdateVaccinationModal from "../../sections/vaccinations/UpdateVaccinationModal";
import { useVaccinationsStore } from "../../stores/vaccinations/VaccinationStore";

const VaccinationPage = () => {
	const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useVaccinationsStore((state) => state);

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
					heading="Vaccinations"
					links={[{ title: "DashBoard", href: "/manager" }, { title: "Vaccinations" }]}
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
				<VaccinationTable />
			</div>
			<ConfirmModal
				title={`Are you sure to delete Member ?`}
				content={'Coming Soon'}
				open={openDeleteModal}
				handleCancel={handleDeleteCancel}
				handleOk={() => { }}
			/>
			<CreateVaccinationModal
				open={openCreateModal}
				handleCancel={handleCreateCancel}
			/>
			<UpdateVaccinationModal
				open={openUpdateModal}
				handleCancel={handleUpdateCancel}
				selectedMember={null}
			/>
		</>
	);
};

export default VaccinationPage;