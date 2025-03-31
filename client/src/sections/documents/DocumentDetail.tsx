import { Modal, Button, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useRef } from "react";
import UnifiedFileViewer from "./UnifiedFileViewer";
import { useDownloadFile } from "../../api/documents/download-file";

type DocumentItem = {
  fileName: string;
  fileType: string;
  uploadDate: string;
  path: string;
};

type DocumentDetailProps = {
  item: DocumentItem | null;
  visible: boolean;
  onCancel: () => void;
};

const DocumentDetail: React.FC<DocumentDetailProps> = ({ item, visible, onCancel }) => {
  if (!item) {
    return null;
  }

  const { data, error, isLoading } = useDownloadFile({ path: item.path });
  const urlRef = useRef<string | null>(null);

  const handleDownload = () => {
    if (!data) return;
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", item.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (data) {
      const blobUrl = window.URL.createObjectURL(new Blob([data]));
      urlRef.current = blobUrl;

      return () => {
        if (urlRef.current !== null && visible === true) {
          URL.revokeObjectURL(urlRef.current);
          urlRef.current = null;
        }
      };
    }
  }, [data, visible]);

  return (
    <Modal
      title={<Title level={4}>Document Detail</Title>}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="download" onClick={handleDownload} disabled={!data || isLoading}>
          {isLoading ? <Spin size="small" /> : "Download File"}
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
      width={900}
    >
      {item && (
        <>
          <p>File name: {item.fileName}</p>
          <p>File type: {item.fileType}</p>
          <p>Upload date: {item.uploadDate}</p>
        </>
      )}
      {isLoading && <p>Loading file, please wait...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Error loading file: {error.message || "File not found or file does not exist"}
        </p>
      )}
      {data && !isLoading && !error && (
        <UnifiedFileViewer
          file={new Blob([data], { type: item.fileType })}
          filePath={item.path}
          fileType={item.fileType}
        />
      )}
    </Modal>
  );
};

export default DocumentDetail;