import { Button, Form, Input, Modal, Select, Row, DatePicker, Col, message } from "antd";
import { Flex } from "antd";
import { MedicalRecord, useMedicalRecordsStore } from "../../stores/medical-records/medicalRecordStore";
import { useCreateMedicalRecord } from "../../api/medicalRecords/create-medical-records";
import dayjs from "dayjs";
const { Option } = Select;

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateMedicalRecordModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useMedicalRecordsStore();

  const mutation = useCreateMedicalRecord({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("New medical record added successfully");
    },
    onError: () => {
      message.error("Failed to add new medical record");
    },
  });

  const onFinish = (values: MedicalRecord) => {
    console.log(values)
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Add medical record"
      open={open}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Member ID"
              name="memberID"
              rules={[{ required: true, message: "Please enter member id" }]}
            >
              <Input placeholder="Enter member id..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }


            >
              <DatePicker placeholder="Select date..." style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Doctor"
              name="doctor"
              rules={[{ required: true, message: "Please enter doctor" }]}
            >
              <Input placeholder="Enter doctor name..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Symptoms"
              name="symptoms"
              rules={[{ required: true, message: "Please describe symptoms" }]}
            >
              <Input placeholder="Describe symptoms..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Diagnosis"
              name="diagnosis"
              rules={[{ required: true, message: "Please enter diagnosis" }]}
            >
              <Input placeholder="Enter diagnosis ..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Treatment"
              name="treatment"
              rules={[{ required: true, message: "Please describe treatment" }]}
            >
              <Input placeholder="Describe treatment..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Facility name"
              name="facilityName"
              rules={[{ required: true, message: "Please enter facility name" }]}
            >
              <Input placeholder="Enter facility name..." />
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

export default CreateMedicalRecordModal;