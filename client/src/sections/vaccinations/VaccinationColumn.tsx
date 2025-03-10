/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useVaccinationsStore, Vaccination } from "../../stores/vaccinations/VaccinationStore";
import { useDeleteVaccination } from "../../api/vaccinations/delete-vaccination";
import { ColumnType } from "antd/es/table";

const useVaccinationColumns = () => {

	const { setOpenUpdateModal, setVaccination } = useVaccinationsStore((state) => state);

	const mutateDelete = useDeleteVaccination({
		onSuccess: () => {
			message.success("Delete vaccination successfully");
		},
		onError: (error) => {
			message.error(`Delete vaccination failed. Reason: ${error.message}`);
		},
	});

	const handleEdit = (vaccination: Vaccination) => {
		setVaccination(vaccination);
		setOpenUpdateModal(true);
	};

	const handleDelete = (id: number) => {
		mutateDelete.mutate(id);
	};

	const columns = useMemo<ColumnType<Vaccination>[]>(
		() => [
			{
				title: "#ID",
				dataIndex: "vaccinationID",
				key: "vaccinationID",
				align: "center",
			},
			{
				title: "Date Administered",
				dataIndex: "dateAdministered",
				key: "dateAdministered",
				align: "center",
				render: (text) => moment(text).format("YYYY-MM-DD"),
			},
			{
				title: "Member Name",
				key: "memberName",
				align: "center",
				render: (_, vaccination) => vaccination.member.fullName,
			},
			{
				title: "Vaccine Name",
				dataIndex: "vaccineName",
				key: "vaccineName",
				align: "center",
			},
			{
				title: "Action",
				key: "action",
				render: (_, vaccination) => (
					<Space>
						<Button
							onClick={() => handleEdit(vaccination)}
							icon={<EditOutlined />}
						/>
						<Popconfirm
							title="Delete the vaccination"
							description="Are you sure to delete this vaccination?"
							onConfirm={() => handleDelete(vaccination.vaccinationID)}
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
		[]
	);
	return columns
};

export default useVaccinationColumns;