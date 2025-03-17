import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import useAllergyColumns from "./AllergyColumns";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import { useAllergies } from "../../api/allergies/get-allergy";
import { useMembers } from "../../api/members/get-members";

export const AllergyTable = () => {

    const columns = useAllergyColumns();
    const [page, setPage] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>("");

    const { data: allergies, isLoading } = useAllergies({
        page,
        size: ROW_PER_PAGE,
        keyword,
    });

    const { data: members } = useMembers({})
    const memberMap = Array.isArray(members)
        ?
        members.reduce((map, member) => {
            map[member.memberID] = member.fullName;
            return map;
        }, {})

        : {};

    const dataSource = Array.isArray(allergies)
        ? allergies.map(allergy => ({
            ...allergy,
            memberName: memberMap[allergy.memberID] || "",
        }))
        : [];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource} // 
                size="middle"
                rowKey={(record) => record.allergyID}
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
                            placeholder="Search allergy..."
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

