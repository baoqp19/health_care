import { Button, Form, Input, Modal, Select, DatePicker, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { UpdateVaccinationParams, useVaccinationsStore, Vaccination } from "../../stores/vaccinations/VaccinationStore";
import { useMembers } from "../../api/members/get-members";
import { useUpdateVaccination } from "../../api/vaccinations/update-vaccination";
import dayjs from "dayjs";

const { Option } = Select;

interface UpdateVaccinationModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedMember: UpdateVaccinationParams | null;
}


const UpdateVaccinationModal: React.FC<UpdateVaccinationModalProps> = ({ open, handleCancel, selectedMember }) => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, vaccination } = useVaccinationsStore((state) => state);

  console.log(vaccination);

  const { data: members } = useMembers({});

  const mutation = useUpdateVaccination({
    onSuccess: () => {
      message.success("Member updated successfully");
      setOpenUpdateModal(false);
    },
    onError: () => {
      message.error("Failed to update member");
    },
  });

  const onFinish = (values: Vaccination) => {
    if (typeof vaccination?.vaccinationID === "number") {
      mutation.mutate({
        vaccinationID: vaccination.vaccinationID,
        data: values,
      });
      setOpenUpdateModal(false);
    }
  };



  useEffect(() => {
    form.resetFields();
    if (vaccination) {
      form.setFieldsValue({
        ...vaccination,
      });
    }
  }, [vaccination, form]);

  return (
    <Modal
      title="Update Member"
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

export default UpdateVaccinationModal;