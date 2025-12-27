// src/pages/system-admin/GymsPage.tsx
import { useEffect, useState } from "react";
import { Table, Button, Drawer, Form, Input, Switch, Space, message } from "antd";
import { gymApi } from "../../api/gyms.api";
import type { Gym } from "../../types/gym";
import { authApi } from "../../api/auth.api";

export default function GymsPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingGym, setEditingGym] = useState<Gym | null>(null);
  const [form] = Form.useForm();

  const loadGyms = async () => {
    setLoading(true);
    try {
      const data = await gymApi.getAll();
      setGyms(data);
    } catch {
      message.error("خطا در دریافت لیست باشگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGyms();
  }, []);

  const openCreate = () => {
    setEditingGym(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (gym: Gym) => {
    setEditingGym(gym);
    form.setFieldsValue(gym);
    setOpen(true);
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    try {
      console.log("TOKEN:", authApi.getToken());

      if (editingGym) {
        await gymApi.update(editingGym.id, values);
        message.success("باشگاه ویرایش شد");
      } else {
        await gymApi.create(values);
        message.success("باشگاه ایجاد شد");
      }
      setOpen(false);
      loadGyms();
    } catch {
      message.error("خطا در ذخیره اطلاعات");
    }
  };

  const removeGym = async (id: number) => {
    try {
      await gymApi.remove(id);
      message.success("باشگاه حذف شد");
      loadGyms();
    } catch {
      message.error("خطا در حذف باشگاه");
    }
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreate}>
          افزودن باشگاه
        </Button>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={gyms}
        pagination={{ pageSize: 10 }}
        columns={[
          { title: "نام باشگاه", dataIndex: "name" },
          { title: "کد", dataIndex: "code" },
          { title: "آدرس", dataIndex: "address" },
     
          {
            title: "عملیات",
            render: (_, record) => (
              <Space>
                <Button onClick={() => openEdit(record)}>ویرایش</Button>
                <Button danger onClick={() => removeGym(record.id)}>
                  حذف
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Drawer
        title={editingGym ? "ویرایش باشگاه" : "افزودن باشگاه"}
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        styles={{ body: { paddingBottom: 80 } }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="نام باشگاه"
            name="name"
            rules={[{ required: true, message: "نام را وارد کنید" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="کد"
            name="code"
            rules={[{ required: true, message: "کد را وارد کنید" }]}
          >
            <Input />
          </Form.Item>
     <Form.Item
            label="آدرس"
            name="address"
            rules={[{ required: true, message: "آدرس را وارد کنید" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" block onClick={onSubmit}>
            ذخیره
          </Button>
        </Form>
      </Drawer>
    </>
  );
}
