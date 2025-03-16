import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteDocument } from "../../api/documents/delete-documents";
import { Document, useDocumentsStore } from "../../stores/documents/documentStore";
import { ColumnType } from "antd/es/table";

const useDocumentColumns = () => {

  const { setOpenUpdateModal, setDocument } = useDocumentsStore((state) => state);

  const mutateDelete = useDeleteDocument({
    onSuccess: () => {
      message.success("Deleted document successfully");
    },
    onError: (error) => {
      message.error(`Failed to delete document. Reason: ${error.message}`);
    },
  });

  const handleEdit = (document: Document) => {
    setDocument(document);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };


  const columns = useMemo<ColumnType<Document>[]>(
    () => [
      {
        title: "#ID",
        dataIndex: "documentID",
        key: "documentID",
        align: "center",
      },
      {
        title: "#RecordID",
        dataIndex: "recordID",
        key: "recordID",
        align: "center",
      },
      {
        title: "File name",
        dataIndex: "fileName",
        key: "fileName",
        align: "center",
      },
      {
        title: "File type",
        dataIndex: "fileType",
        key: "fileType",
      },
      {
        title: "File content",
        dataIndex: "fileContent",
        key: "fileContent",
      },
      {
        title: "Upload date",
        dataIndex: "uploadDate",
        key: "uploadDate",
      },
      {
        title: "Action",
        key: "action",
        render: (_, document) => (
          <Space>
            <Button
              onClick={() => handleEdit(document)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Remove document"
              description="Are you sure to remove this document ?"
              onConfirm={() => handleDelete(document.documentID)}
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

export default useDocumentColumns;