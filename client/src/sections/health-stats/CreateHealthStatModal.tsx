import { Button, Form, Input, Modal, DatePicker, Row, Col, message, Select } from "antd";
import { Flex } from "antd";
import { useState } from "react";
import { HealthStat, useHealthStatsStore } from "../../stores/health-stats/healthStatStore";
import dayjs from "dayjs";
import { useCreateHealthStat } from "../../api/health-stats/create-health-stat";

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
  selectedMemberId: number
}


const CreateHealthStatModal = ({ open, handleCancel, selectedMemberId }: PropsCreate) => {

  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useHealthStatsStore();

  const mutation = useCreateHealthStat({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("Health status created successfully");
    },
    onError: () => {
      message.error("Failed to create health status");
    },
  });

  const onFinish = (values: HealthStat) => {
    const formattedValues = {
      ...values,
      statType: selectedStatType,
      memberID: selectedMemberId,
    }
    mutation.mutate(formattedValues)
  };

  const [selectedStatType, setSelectedStatType] = useState('Blood Pressure')

  const handleChange = (value: string) => {
    setSelectedStatType(value);
  }

  const setPlaceholderOfStatValue = () => {
    switch (selectedStatType) {
      case 'Blood Pressure':
        return 'mmHg'
      case 'Blood Glucose':
        return 'mg/dL'
      case 'Heart Rate':
        return 'bpm'
    }
  }

  return (
    <Modal
      title="Create Health Status"
      open={openCreateModal}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Status type"
              name="statType"
            >
              <Select
                defaultValue="Blood Pressure"
                style={{
                  width: '100%',
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'Blood Pressure',
                    label: 'Blood Pressure'
                  },
                  {
                    value: 'Blood Glucose',
                    label: 'Blood Glucose'
                  },
                  {
                    value: 'Heart Rate',
                    label: 'Heart Rate'
                  }
                ]}
              >
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status Value"
              name="statValue"
              rules={[
                { required: true, message: "Please enter status value" },
                {}
              ]}
            >
              <Input
                placeholder={setPlaceholderOfStatValue()}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.keyCode != 8 && e.keyCode != 46) {
                    e.preventDefault(); //Chặn các kí tự không phải là số
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Date and time"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}

              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }
            >
              <DatePicker
                showTime
                placeholder="Select the date and time of measurement."
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm"
              />
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
  )
}

export default CreateHealthStatModal;