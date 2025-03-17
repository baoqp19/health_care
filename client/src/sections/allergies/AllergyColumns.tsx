import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Allergy, useAllergiesStore } from "../../stores/allergies/allergyStore";
import { useDeleteAllergy } from "../../api/allergies/delete-allergy";
import { useMemo } from "react";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";

const useAllergyColumns = () => {

    const { t } = useTranslation();

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
                title: t("ID"),
                dataIndex: "allergyID",
                key: "allergyID",
                align: "center",
            },
            {
                title: "Member name",
                dataIndex: "memberName",
                key: "memberName",
            },
            {
                title: t("AllergyPage.AllergyType"),
                dataIndex: "allergyType",
                key: "allergyType",
            },
            {
                title: t("AllergyPage.Severity"),
                dataIndex: "severity",
                key: "severity",
            },
            {
                title: t("AllergyPage.Symptoms"),
                dataIndex: "symptoms",
                key: "symptoms",
            },
            {
                title: t("Action"),
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
        [t]
    );

    return columns
};

export default useAllergyColumns;