// src/pages/GymsPage.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import type { Gym } from "../../types/gym";
import { gymApi } from "../../api/gyms.api";

export default function GymsPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGym, setEditingGym] = useState<Gym | null>(null);

  const [form] = Form.useForm();

  const loadGyms = async () => {
    setLoading(true);
    try {
      const data = await gymApi.getAll();
      setGyms(data);
    } catch (err) {
      message.error("خطا در دریافت لیست باشگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGyms();
  }, []);

  const handleEdit = (gym: Gym) => {
    setEditingGym(gym);
    form.setFieldsValue(gym);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await gymApi.remove(id);
      message.success("باشگاه حذف شد");
      loadGyms();
    } catch {
      message.error("خطا در حذف باشگاه");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingGym) {
        await gymApi.update(editingGym.id, values);
        message.success("باشگاه ویرایش شد");
      } else {
        await gymApi.create(values);
        message.success("باشگاه جدید ایجاد شد");
      }
      setModalVisible(false);
      setEditingGym(null);
      form.resetFields();
      loadGyms();
    } catch {
      message.error("خطا در ثبت اطلاعات");
    }
  };

  const columns = [
    { title: "نام باشگاه", dataIndex: "name", key: "name" },
    { title: "آدرس", dataIndex: "address", key: "address" },
    { title: "تلفن", dataIndex: "phone", key: "phone" },
    {
      title: "عملیات",
      key: "actions",
      render: (_: any, record: Gym) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>ویرایش</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        افزودن باشگاه
      </Button>
      <Table columns={columns} dataSource={gyms} loading={loading} rowKey="id" />

      <Modal
        title={editingGym ? "ویرایش باشگاه" : "افزودن باشگاه"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          setEditingGym(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="نام باشگاه" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="آدرس" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="تلفن" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
