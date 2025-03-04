import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Allergy, useAllergiesStore } from "../../stores/allergies/allergyStore";
import { useDeleteAllergy } from "../../api/allergies/delete-allergy";
import { useMemo } from "react";
import { ColumnType } from "antd/es/table";

const useAllergyColumns = () => {
    const { setOpenUpdateModal, setAllergy } = useAllergiesStore(
        (state) => state
    );

    const mutateDelete = useDeleteAllergy({
        onSuccess: () => {
            message.success("Deleted allergy successfully");
        },
        onError: (error) => {
            message.error(`Failed to delete allergy. Reason: ${error.message}`);
        },
    });

    const handleEdit = (allergy: Allergy) => {
        setAllergy(allergy);
        setOpenUpdateModal(true);
    };

    const handleDelete = (id: number) => {
        mutateDelete.mutate(id);
    };

    const columns = useMemo<ColumnType<Allergy>[]>(
        () => [
            {
                title: "#ID",
                dataIndex: "allergyID",
                key: "allergyID",
                align: "center",
            },
            {
                title: "#MemberID",
                dataIndex: "memberID",
                key: "memberID",
                align: "center",
            },
            {
                title: "Allergy Type",
                dataIndex: "allergyType",
                key: "allergyType",
                align: "center",
            },
            {
                title: "Severity",
                dataIndex: "severity",
                key: "severity",
            },
            {
                title: "Symptoms",
                dataIndex: "symptoms",
                key: "symptoms",
            },
            {
                title: "Action",
                key: "action",
                render: (_, allergy) => (
                    <Space>
                        <Button
                            onClick={() => handleEdit(allergy)}
                            icon={<EditOutlined />}
                        />
                        <Popconfirm
                            title="Remove allergy"
                            description="Are you sure to remove this allergy ?"
                            onConfirm={() => handleDelete(allergy.allergyID)}
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

export default useAllergyColumns;