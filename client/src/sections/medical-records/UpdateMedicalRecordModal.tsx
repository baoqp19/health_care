import { Button, Form, Input, Modal, Select, Row, DatePicker, Col, message } from "antd";
import { Flex } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { MedicalRecord, UpdateMedicalRecordParams, useMedicalRecordsStore } from "../../stores/medical-records/medicalRecordStore";
import { useUpdateMedicalRecord } from "../../api/medicalRecords/update-medical-records";
import dayjs from "dayjs";

const { Option } = Select;

interface UpdateMedicalRecordModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedMedicalRecord: UpdateMedicalRecordParams | null;
}




const UpdateMedicalRecordModal: React.FC<UpdateMedicalRecordModalProps> = ({ open, handleCancel, selectedMedicalRecord }) => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, medicalRecord } = useMedicalRecordsStore((state) => state);

  const mutation = useUpdateMedicalRecord({
    onSuccess: () => {
      message.success("Medical record changes recorded successfully");
    },
    onError: () => {
      message.error("Failed to update medical record");
    },
  });

  const onFinish = (values: MedicalRecord) => {
    if (typeof medicalRecord?.recordID === "number") {
      console.log(values)
      mutation.mutate({
        recordID: medicalRecord.recordID,
        data: values,
      });
    }
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    if (medicalRecord) {
      form.setFieldsValue({
        ...medicalRecord,
      });
    }
  }, [medicalRecord, form]);

  return (
    <Modal
      title="Update medical record"
      open={openUpdateModal}
      onCancel={handleCancel}
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

export default UpdateMedicalRecordModal;