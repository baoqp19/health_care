import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useDocumentColumns from "./DocumentColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useDocuments } from "../../api/documents/get-documents";
import DocumentDetail from "./DocumentDetail";

export const DocumentTable = () => {
	const columns = useDocumentColumns();
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { data: documents, isLoading } = useDocuments({
		page,
		size: ROW_PER_PAGE,
		keyword,
	});

	const doubleClickHandler = (item: any) => {
		setSelectedItem(item);
		setIsModalVisible(true);
	}

	return (
		<>
			<Table
				columns={columns}
				dataSource={Array.isArray(documents) ? documents : []} // 
				size="middle"
				onRow={(item) => {
					return {
						onDoubleClick: () => {
							doubleClickHandler(item);
						}
					}
				}}
				pagination={{
					current: page,
					pageSize: ROW_PER_PAGE,
					total: 4,
					onChange: (newPage) => setPage(newPage),
				}}
				loading={isLoading}
				title={() => (
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Input.Search
							placeholder="Search document..."
							className="w-[250px]"
							allowClear
							onSearch={(value) => {
								setKeyword(value);
								setPage(1);
							}}
						/>
						<Button icon={<ExportOutlined />}>
							Export <Tag color="blue">Coming Soon</Tag>
						</Button>
					</div>
				)}
			/>
			<DocumentDetail
				visible={isModalVisible}
				item={selectedItem}
				onCancel={() => setIsModalVisible(false)}
			/>
		</>
	);
};