import { Table } from "antd";

export default function CustomersPage() {
  const data = [
    { id: 1, name: "علی رضایی", mobile: "0912xxxx" },
    { id: 2, name: "مهدی احمدی", mobile: "0935xxxx" },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={[
        { title: "نام", dataIndex: "name" },
        { title: "موبایل", dataIndex: "mobile" },
      ]}
    />
  );
}
