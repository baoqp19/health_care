import { Button, Form, Input, Modal, Select, Row, DatePicker, Col, message } from "antd";
import { Flex } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { Document, UpdateDocumentParams, useDocumentsStore } from "../../stores/documents/documentStore";
import { useUpdateDocument } from "../../api/documents/update-documents";
import dayjs from "dayjs";

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

  const mutation = useUpdateDocument({
    onSuccess: () => {
      message.success("Document changes recorded successfully");
    },
    onError: () => {
      message.error("Failed to update document changes");
    },
  });

  const onFinish = (values: Document) => {
    if (typeof document?.documentID === "number") {
      mutation.mutate({
        documentID: document.documentID,
        data: values,
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
              <Input placeholder="Choose type of file..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="File content"
              name="fileContent"
              rules={[{ required: true, message: "Please enter file content" }]}
            >
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