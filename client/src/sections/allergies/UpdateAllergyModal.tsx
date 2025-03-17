import { Button, Form, Input, Modal, Row, Col, message, Select } from "antd";
import { Flex } from "antd";
import { useEffect, useMemo } from "react";
import { Allergy, UpdateAllergyProps, useAllergiesStore } from "../../stores/allergies/allergyStore";
import { useUpdateAllergy } from "../../api/allergies/update-allergy";
import { useMembers } from "../../api/members/get-members";


// Định nghĩa kiểu dữ liệu cho props
interface UpdateAllergyModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedAllergy: UpdateAllergyProps | null;
}

const UpdateAllergyModal: React.FC<UpdateAllergyModalProps> = ({ open, handleCancel, selectedAllergy }) => {

  const { openUpdateModal, setOpenUpdateModal, allergy } = useAllergiesStore(
    (state) => state
  );

  const [form] = Form.useForm();

  const { data: members } = useMembers({});

  const membersArray = Array.isArray(members) ? members : [];

  const memberOptions = useMemo(() => {
    return membersArray
      ? membersArray.map(({ memberID, fullName }) => ({
        value: memberID,
        label: `${fullName}`,
      }))
      : [];
  }, [membersArray]);


  const mutation = useUpdateAllergy({
    onSuccess: () => {
      message.success("Allergy change recorded successfully");
    },
    onError: () => {
      message.error("Failed to update allergy");
    },
  });

  const onFinish = (values: Allergy) => {
    if (typeof allergy?.allergyID === "number") {
      mutation.mutate({
        allergyID: allergy.allergyID,
        data: values,
      });

      console.log(values)
      setOpenUpdateModal(false);
    };
  }

  useEffect(() => {
    if (allergy) {
      form.setFieldsValue({
        ...allergy,
      });
    }
  }, [allergy, form]);

  return (
    <Modal
      title="Update Allergy"
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
          <Col span={12}>
            <Form.Item
              label="Member"
              name="memberID"
              rules={[{ required: true, message: "Please choose a member" }]}
            >
              <Select
                showSearch
                placeholder="Choose a member..."
                optionFilterProp="label"
                options={memberOptions}
                notFoundContent="Loading members..."
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Allergy type"
              name="allergyType"
              rules={[
                { required: true, message: "Please enter type of allergy" },
              ]}
            >
              <Input placeholder="Enter allergy type..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Symptoms"
              name="symptoms"
              rules={[
                {
                  required: true,
                  message: "Please describe symptoms of the allergy",
                },
              ]}
            >
              <Input placeholder="Describe symptoms..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Severity"
              name="severity"
              rules={[
                { required: true, message: "Please enter severity of allergy" },
              ]}
            >
              <Input placeholder="Enter severity" />
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

export default UpdateAllergyModal;