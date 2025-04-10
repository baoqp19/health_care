import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";

type UnifiedFileViewerProps = {
  file: Blob | null;
  filePath: string;
  fileType: string;
};

function UnifiedFileViewer({ file, filePath, fileType }: UnifiedFileViewerProps) {


  const [content, setContent] = useState<string>("");
  const [excelData, setExcelData] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);


  const handleTextFile = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) setContent(e.target.result as string);
    };
    reader.readAsText(fileBlob);
  };

  const handleExcelFile = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const binaryStr = e.target.result as string;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setExcelData(jsonData);
      };
    }
    reader.readAsArrayBuffer(fileBlob);
  };

  const handleImageFile = (fileBlob: Blob | null) => {
    if (!fileBlob) return;
    setImageUrl(URL.createObjectURL(fileBlob));
  };

  // const handlePdfFile = () => {
  //   setContent(filePath || URL.createObjectURL(file));
  // };

  const handlePdfFile = () => {
    if (filePath) {
      setContent(filePath);
    } else if (file) {
      setContent(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fileBlob = file || null;

    if (fileType === "text/plain" && fileBlob) {
      handleTextFile(fileBlob);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      fileBlob
    ) {
      handleExcelFile(fileBlob);
    } else if (fileType.startsWith("image/") && fileBlob) {
      handleImageFile(fileBlob);
    } else if (fileType === "application/pdf") {
      handlePdfFile();
    } else {
      setContent("Không hỗ trợ định dạng file này, vui lòng tải về để xem");
    }

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (content && typeof content === "string" && content.startsWith("blob:"))
        URL.revokeObjectURL(content);
    };
  }, [file, filePath, fileType]);

  return (
    <div>
      {fileType === "text/plain" && (
        <pre className="border p-4 bg-gray-100 text-gray-800 rounded whitespace-pre-wrap">
          {content}
        </pre>
      )}

      {fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
          <div className="border p-4 bg-gray-100 rounded overflow-auto max-h-80">
            <p>Dữ liệu từ file excel sẽ được hiển thị dưới dạng json:</p>
            <pre className="text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(excelData, null, 2)}
            </pre>
          </div>
        )}

      {fileType === "application/pdf" && content && (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={content} />
          </Worker>
        </div>
      )}

      {fileType.startsWith("image/") && imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Hình ảnh tải lên"
            style={{ maxWidth: "100%" }}
            className="border rounded "
          />
        </div>
      )}

      {content === "Không hỗ trợ định dạng file này, vui lòng tải về để xem" && <p className="italic">{content}</p>}
    </div>
  );
}

export default UnifiedFileViewer;