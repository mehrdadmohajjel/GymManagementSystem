import { Button, Table, Drawer, Form, Input } from "antd";
import { useState } from "react";

export default function ServicesPage() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const data = [
    { id: 1, name: "بدنسازی", price: 500000 },
    { id: 2, name: "TRX", price: 700000 },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        افزودن خدمت
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "نام خدمت", dataIndex: "name" },
          { title: "قیمت", dataIndex: "price" },
        ]}
        style={{ marginTop: 16 }}
      />

      <Drawer
        title="خدمت جدید"
        open={open}
        onClose={() => setOpen(false)}
        styles={{ body: { paddingBottom: 80 } }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="نام خدمت" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="قیمت">
            <Input />
          </Form.Item>

          <Button type="primary" block>
            ذخیره
          </Button>
        </Form>
      </Drawer>
    </>
  );
}
