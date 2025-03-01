import { Modal } from "antd";
import Title from "antd/es/typography/Title";


type confimModalProps = {
  title: string,
  content: string,
  open: boolean,
  handleOk?: () => void,
  handleCancel: () => void

}

const ConfirmModal = ({ title, content, open, handleOk, handleCancel }: confimModalProps) => {
  return (
    <Modal open={open} title={title} onOk={handleOk} onCancel={handleCancel}>
      <Title level={4}>{content}</Title>
    </Modal>
  );
};


export default ConfirmModal;
