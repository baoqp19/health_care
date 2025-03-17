import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Contact, useEmergencyContactStore } from "../../stores/emergencyContacts/emergencyContactStore";
import { ColumnType } from "antd/es/table";
import { useDeleteEmergencyContact } from "../../api/emergencyContacts/delete-emeregencyContact";
import { useTranslation } from "react-i18next";

const useEmergencyContactColumns = () => {
  const { t } = useTranslation();
  const { setOpenUpdateModal, setEmergencyContact } = useEmergencyContactStore((state) => state);

  const mutateDelete = useDeleteEmergencyContact({

    onSuccess: () => {
      message.success("Delete emergency Contact successfully");
    },
    onError: (error) => {
      message.error(`Delete emergency contact failed. Reason: ${error.message}`);
    },

  });

  const handleEdit = (emergency: Contact) => {
    setEmergencyContact(emergency);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<Contact>[]>(
    () => [

      {
        title: t("ID"),
        dataIndex: "contactID",
        key: "contactID",
        align: "center",
      },


      {
        title: t("EmergencyContactPage.Name"),
        dataIndex: "name",
        key: "name",
        align: "center",
      },

      {
        title: t("EmergencyContactPage.Relationship"),
        dataIndex: "relationship",
        key: "relationship",
      },

      {
        title: t("EmergencyContactPage.Phone Number"),
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },

      {
        title: t("EmergencyContactPage.User ID"),
        dataIndex: "userID",
        key: "userID",
      },

      {
        title: t("Action"),
        key: "action",
        render: (_, emergencyContact) => (
          <Space>
            <Button
              onClick={() => handleEdit(emergencyContact)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the emergency contact"
              description="Are you sure to delete this emergency contact?"
              onConfirm={() => handleDelete(emergencyContact.contactID)}
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
    [t]
  );
  return columns
};

export default useEmergencyContactColumns;