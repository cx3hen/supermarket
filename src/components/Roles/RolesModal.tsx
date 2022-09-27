import { Button, Modal, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { RolesDataType } from '../../type';
import { alterRolesInformation, createRoles } from '../../service';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
  rowDate?: RolesDataType;
  setRefresh: () => void;
}

const RolesModal = (props: IProps) => {
  const { rowDate, setRefresh } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (rowDate) {
      //修改
      form
        .validateFields()
        .then(values => {
          alterRolesInformation(rowDate.id, values).then(() => {
            message.success('修改成功');
          });
        })
        .finally(() => {
          setRefresh();
          setIsModalOpen(false);
        });
    } else {
      //创建
      form.validateFields().then(values => {
        createRoles(values).then(() => {
          setRefresh();
          setIsModalOpen(false);
          message.success('创建成功');
        });
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <>
      {rowDate ? (
        <EditOutlined onClick={showModal} />
      ) : (
        <Button type="primary" style={{ marginLeft: 10 }} onClick={showModal}>
          添加角色
        </Button>
      )}
      <Modal title={rowDate ? '修改信息' : '添加用户'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form}>
          <Form.Item name={'roleName'} label="角色名称" initialValue={rowDate?.roleName} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'roleDesc'} label="角色描述" initialValue={rowDate?.roleDesc} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default RolesModal;
