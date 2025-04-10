import { Button, Form, Input, Modal, Select, Row, DatePicker, Col, message, Upload } from "antd";
import { Flex } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Document, Document1, UpdateDocumentParams, useDocumentsStore } from "../../stores/documents/documentStore";
import { useUpdateDocument } from "../../api/documents/update-documents";
import dayjs from "dayjs";
import { fileExtensions } from "./FileExtensions";
import { UploadOutlined } from "@ant-design/icons";


const { Option } = Select;

interface UpdateDocumentModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedDocument: UpdateDocumentParams | null;
}

// Định nghĩa kiểu dữ liệu cho Member

const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({ open, handleCancel, selectedDocument }) => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, document } = useDocumentsStore(
    (state) => state
  );

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (info: { fileList: any[] }) => {
    const file = info.fileList[0].originFileObj;
    if (file && file.size > 0) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target) {
          message.error("Error reading file.");
          return;
        }
        const fileContent = e.target.result as string;
        const formattedDate = moment(file.lastModifiedDate);
        const fileInfo = {
          fileName: file.name,
          fileType: file.type || "Unknown",
          fileContent: fileContent.substring(0, 50) + "...",
          uploadDate: formattedDate,
        };

        form.setFieldsValue({
          fileName: fileInfo.fileName,
          fileType: fileInfo.fileType,
          fileContent: fileInfo.fileContent,
          uploadDate: fileInfo.uploadDate,
        });
        message.success(`${file.name} uploaded successfully.`);
      };

      reader.onerror = () => {
        message.error("Error while reading file");
      };

      reader.readAsText(file);
    }
  };

  const mutation = useUpdateDocument({
    onSuccess: () => {
      message.success("Document changes recorded successfully");
    },
    onError: () => {
      message.error("Failed to update document changes");
    },
  });

  const onFinish = (values: Document1) => {
    const { uploadFile, ...filteredValues } = values;
    if (typeof document?.documentID === "number") {
      mutation.mutate({
        documentID: document.documentID,
        data: filteredValues,
        file: selectedFile 
      });
      setOpenUpdateModal(false);
    };
  }
  useEffect(() => {
    if (document) {
      form.setFieldsValue({
        ...document,
        date: document.uploadDate ? moment(document.uploadDate) : null,
      });
    }
  }, [document, form]);

  return (
    <Modal
      title="Update document"
      open={openUpdateModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Record ID"
              name="recordID"
              rules={[{ required: true, message: "Please enter record id" }]}
            >
              <Input placeholder="Enter record id..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="File name"
              name="fileName"
              rules={[{ required: true, message: "Please enter file name" }]}
            >
              <Input placeholder="Enter file name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="File type"
              name="fileType"
              rules={[
                { required: true, message: "Please choose type of file" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a file type..."
                optionFilterProp="label"
                options={fileExtensions}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="File content" name="fileContent">
              <Input placeholder="Enter file content..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Upload date"
              name="uploadDate"
              rules={[{ required: true, message: "Please select date" }]}

              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }

            >
              <DatePicker
                placeholder="Select date..."
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Using file" name="uploadFile">
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={false} type="default" htmlType="reset">
              Reset
            </Button>
            <Button loading={false} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDocumentModal;