import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useDocumentColumns from "./DocumentColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useDocuments } from "../../api/documents/get-documents";

export const DocumentTable = () => {
	const columns = useDocumentColumns();
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState("");

	const { data: documents, isLoading } = useDocuments({
		page,
		size: ROW_PER_PAGE,
		keyword,
	});

	return (
		<>
			<Table
				columns={columns}
				dataSource={Array.isArray(documents) ? documents : []} // 
				size="middle"
				onRow={(item) => {
					return {
						onDoubleClick: () => console.log(item)
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
		</>
	);
};