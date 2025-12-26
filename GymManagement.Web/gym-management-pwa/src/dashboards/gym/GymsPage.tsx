// src/dashboards/system/GymsPage.tsx
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";

export default function GymsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/gyms").then(res => setData(res.data));
  }, []);

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }}>
        افزودن باشگاه
      </Button>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          { title: "نام باشگاه", dataIndex: "name" },
          { title: "مدیر", dataIndex: "adminName" }
        ]}
      />
    </>
  );
}
