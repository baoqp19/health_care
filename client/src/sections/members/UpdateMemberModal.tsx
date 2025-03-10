import { Button, Col, DatePicker, Flex, Form, Input, message, Modal, Row, Select } from "antd";
import { useUpdateMember } from "../../api/members/update-member";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Member, UpdateMemberParams, useMembersStore } from "../../stores/members/memberStore";
const { Option } = Select;



// Định nghĩa kiểu dữ liệu cho props
interface UpdateMemberModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedMember: UpdateMemberParams | null;
}

// Định nghĩa kiểu dữ liệu cho Member


const UpdateMemberModal: React.FC<UpdateMemberModalProps> = ({ open, handleCancel, selectedMember }) => {
  const [form] = Form.useForm();

  const { openUpdateModal, setOpenUpdateModal, member } = useMembersStore((state) => state);

  const mutation = useUpdateMember({
    onSuccess: () => {
      form.resetFields();
      message.success("Member updated successfully");
    },
    onError: () => {
      message.error("Failed to update member");
    },
  });


  const onFinish = (values: Member) => {
    if (typeof member?.memberID === "number") {
      mutation.mutate({
        memberID: member?.memberID,
        data: values,
      });
      setOpenUpdateModal(false);
    }
  };


  useEffect(() => {
    if (member) {
      form.setFieldsValue({
        ...member
      });
    }
  }, [member, form]);


  return (
    <Modal
      title="Update employee"
      open={openUpdateModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Enter full name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Date of Birth"
              name="dateOfBirth"
              rules={[{ required: true, message: "Please select date of birth" }]}

              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }

            >
              <DatePicker placeholder="Select date of birth..." style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender...">
                <Option value="MALE">MALE</Option>
                <Option value="FEMALE">FEMALE</Option>
                <Option value="OTHER">OTHER</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[{ required: true, message: "Please enter relationship" }]}
            >
              <Input placeholder="Enter relationship..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Blood Type"
              name="bloodType"
              rules={[{ required: true, message: "Please select blood type" }]}
            >
              <Select placeholder="Select blood type...">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="AB">AB</Option>
                <Option value="O">O</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Height (m)"
              name="height"
              rules={[{ required: true, message: "Please enter height" }]}
            >
              <Input type="number" step="0.01" placeholder="Enter height in meters..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Weight (kg)"
              name="weight"
              rules={[{ required: true, message: "Please enter weight" }]}
            >
              <Input type="number" step="0.1" placeholder="Enter weight in kilograms..." />
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

export default UpdateMemberModal;
