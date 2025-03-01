import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMember } from "../../api/members/delete-member";
import { ColumnType } from "antd/es/table";

interface Member {
    memberID: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    relationship: string;
    bloodType: string;
    height: number;
    weight: number;
}

const MemberTable = () => {
    const mutateDelete = useDeleteMember({
        onSuccess: () => {
            message.success("Delete member successfully");
        },
        onError: (error) => {
            message.error(`Delete member failed. Reason: ${error.message}`);
        },
    });

    const handleEdit = (id: string) => {
        console.log("Edit member with ID: ", id);
    };

    const handleDelete = (id: any) => {
        mutateDelete.mutate(id);
    };

    const columns = useMemo<ColumnType<Member>[]>(
        () => [
            {
                title: "#ID",
                dataIndex: "memberID",
                key: "memberID",
                align: "center",
            },
            {
                title: "Full Name",
                dataIndex: "fullName",
                key: "fullName",
                align: "center",
            },
            {
                title: "Date of Birth",
                dataIndex: "dateOfBirth",
                key: "dateOfBirth",
            },
            {
                title: "Gender",
                dataIndex: "gender",
                key: "gender",
            },
            {
                title: "Relationship",
                dataIndex: "relationship",
                key: "relationship",
            },
            {
                title: "Blood Type",
                dataIndex: "bloodType",
                key: "bloodType",
            },
            {
                title: "Height (m)",
                dataIndex: "height",
                key: "height",
            },
            {
                title: "Weight (kg)",
                dataIndex: "weight",
                key: "weight",
            },
            {
                title: "Action",
                key: "action",
                render: (_, member) => (
                    <Space>
                        <Button
                            onClick={() => handleEdit(member.memberID)}
                            icon={<EditOutlined />}
                        />
                        <Popconfirm
                            title="Delete the member"
                            description="Are you sure to delete this member?"
                            onConfirm={() => handleDelete(member.memberID)}
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

    return columns;
};

export default MemberTable;
