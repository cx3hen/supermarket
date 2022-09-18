import { Button, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import { UsersDataType } from '../../type';
import { alterUsersInformation } from '../../service';
import { EditOutlined } from '@ant-design/icons';
interface IProps {
  rowDate: UsersDataType;
  setRefresh: () => void;
}

const UsersModal = (props: IProps) => {
  const { setRefresh } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const { rowDate } = props;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values =>
      alterUsersInformation(rowDate.id, values).then(() => {
        setRefresh();
        setIsModalOpen(false);
      })
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <EditOutlined onClick={showModal} />
      <Modal title="信息修改" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form}>
          <Form.Item name={'username'} label="用户名" initialValue={rowDate.username}>
            <Input disabled />
          </Form.Item>
          <Form.Item name={'email'} label="邮箱" initialValue={rowDate.email} rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'mobile'} label="手机" initialValue={rowDate.mobile} rules={[{ len: 11, required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UsersModal;
