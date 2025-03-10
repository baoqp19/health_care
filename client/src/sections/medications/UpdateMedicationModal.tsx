import { Button, Form, Input, Modal, DatePicker, Row, Col, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { MedicationUpdateProps, UpdateMedicationParams, useMedicationsStore } from "../../stores/medications/medicationStore";
import { useUpdateMedication } from "../../api/medication/update-medication";
import dayjs from "dayjs";

// const { Option } = Select;


interface UpdateMedicationModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedMedication: UpdateMedicationParams | null;
}



const UpdateMedicationModal: React.FC<UpdateMedicationModalProps> = ({ open, handleCancel, selectedMedication }) => {

  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, medication } = useMedicationsStore((state) => state);

  const mutation = useUpdateMedication({
    onSuccess: () => {
      form.resetFields();
      message.success("Medication updated successfully");
    },
    onError: () => {
      message.error("Failed to update medication");
    },
  });

  const onFinish = (values: MedicationUpdateProps) => {
    if (typeof medication?.medicationID === "number") {
      mutation.mutate({
        medicationID: medication.medicationID,
        data: values,
      });
      setOpenUpdateModal(false);
    };
  }

  useEffect(() => {
    if (medication) {
      form.setFieldsValue({
        ...medication,
      });
    }
  }, [medication, form]);



  return (
    <Modal
      title="Update Medication"
      open={open}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Medication Name"
              name="name"
              rules={[{ required: true, message: "Please enter medication name" }]}
            >
              <Input placeholder="Enter medication name..." />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Frequency"
              name="frequency"
              rules={[{ required: true, message: "Please enter frequency" }]}
            >
              <Input placeholder="Enter frequency. Ex: 2 lần/ngày" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }
            >
              <DatePicker placeholder="Select start date of medication..." style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }
            // rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker placeholder="Select end date of medication..." style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Note"
              name="note"
            //                   rules={[{ required: true, message: "Please enter note" }]}
            >
              <Input placeholder="Enter note." />
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

export default UpdateMedicationModal;