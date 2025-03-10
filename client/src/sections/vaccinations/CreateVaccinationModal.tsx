import { Button, Form, Input, Modal, DatePicker, Row, Col, Select, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { useVaccinationsStore, Vaccination } from "../../stores/vaccinations/VaccinationStore";
import { useMembers } from "../../api/members/get-members";
import { useCreateVaccination } from "../../api/vaccinations/create-vaccination";
import dayjs from "dayjs";

const { Option } = Select;

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateVaccinationModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useVaccinationsStore();

  const { data: members } = useMembers({});

  useEffect(() => {
    if (openCreateModal) {
      form.resetFields();
    }
  }, [openCreateModal, form]);

  const mutation = useCreateVaccination({
    onSuccess: () => {
      handleCancel?.();
      setOpenCreateModal(false);
      message.success("Vaccination created successfully");
    },
    onError: () => {
      message.error("Failed to create vaccination");
    },
  });

  const onFinish = (values: Vaccination) => {
    console.log("Received:", values);
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Create Vaccination"
      open={open}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Member"
              name="memberID"
              rules={[{ required: true, message: "Please select member" }]}
            >
              <Select placeholder="Select member...">
                {Array.isArray(members) &&
                  members.map((member) => (
                    <Option key={member?.memberID} value={member?.memberID}>
                      {member?.fullName || "Không có tên"}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Vaccination Name"
              name="vaccineName"
              rules={[
                { required: true, message: "Please enter vaccination name" },
              ]}
            >
              <Input placeholder="Enter vaccination name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Date Administered"
              name="dateAdministered"
              rules={[
                { required: true, message: "Please enter vaccination date" },
              ]}
              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }
            >
              <DatePicker className="w-full" />
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

export default CreateVaccinationModal;