

import { Button, Col, DatePicker, Flex, Form, Input, message, Modal, Row } from 'antd';
import React from 'react'
import { Medication } from '../../stores/medications/medicationStore';
import { useCreateMedication } from '../../api/medication/create-medication';
import dayjs from 'dayjs';

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateMedicationModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();

  const mutation = useCreateMedication({
    onSuccess: () => {
      form.resetFields();
      handleCancel?.();
      message.success("Member created successfully");
    },
    onError: () => { // Lỗi chỗ này là 'onFinish' -> đúng phải là 'onError'
      message.error("Failed to create member");
    },
  });



  const onFinish = (values: Medication) => {
    console.log(values)
    mutation?.mutate?.(values);
  };

  return (
    <Modal
      title="Create Medication"
      open={open}
      onCancel={handleCancel}
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
              // rules={[{ required: true, message: "Please select end date" }]}
              getValueProps={(value) => ({
                value: value ? dayjs(value, "YYYY-MM-DD") : null, // Chuyển string -> dayjs để hiển thị đúng trong form 
              })}
              getValueFromEvent={(date) =>
                date ? date.format("YYYY-MM-DD") : "" // Chuyển dayjs -> string để lưu cho đúng định dạng
              }
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
            //                           rules={[{ required: true, message: "Please enter note" }]}
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
  )
}

export default CreateMedicationModal








