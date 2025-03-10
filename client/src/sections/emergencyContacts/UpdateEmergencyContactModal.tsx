import { Button, Form, Input, Modal, Row, Col, message } from "antd";
import { useEffect } from "react";
import { Flex } from "antd";
import { Contact, UpdateContactParams, useEmergencyContactStore } from "../../stores/emergencyContacts/emergencyContactStore";
import { useUpdateEmergencyContact } from "../../api/emergencyContacts/update-emergencyContact";

// const { Option } = Select; 

interface UpdateContactModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedContact: UpdateContactParams | null;
}





const UpdateEmergencyContactModal: React.FC<UpdateContactModalProps> = ({ open, handleCancel, selectedContact }) => {

  const [form] = Form.useForm();

  const { openUpdateModal, setOpenUpdateModal, emergencyContact } = useEmergencyContactStore((state) => state);

  console.log("emergencyContact:", emergencyContact);

  const mutation = useUpdateEmergencyContact({

    onSuccess: () => {

      form.resetFields();  // Reset form sau khi cập nhật thành công
      message.success("Emergency contact updated successfully");
      setOpenUpdateModal(false); // Đóng modal
    },
    onError: () => {
      message.error("Failed to update emergency contact");
    },
  });

  const onFinish = (values: Contact) => {
    console.log(values)
    if (typeof emergencyContact?.contactID === "number") {
      mutation.mutate({
        emergencyContactID: emergencyContact.contactID,
        data: values,
      });
      setOpenUpdateModal(false);
    } else {
      console.log("sai điều kiện if")
    };

  }


  useEffect(() => {
    if (emergencyContact) {
      form.setFieldsValue({
        ...emergencyContact,
      });
    }
  }, [emergencyContact, form]);

  return (
    <Modal
      title="Update Emergency Contact"
      open={open}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form
        className="pt-4"
        layout="vertical"
        variant="filled"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="User ID"
              name="userID"
              rules={[{ required: true, message: "Please enter userID" }]}
            >
              <Input placeholder="Enter userID..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter name..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[{ required: true, message: "Please enter relationship" }]}
            >
              <Input placeholder="Enter relationship..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button
              loading={false}
              type="default"
              htmlType="reset"
            >
              Reset
            </Button>
            <Button
              loading={false}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEmergencyContactModal;