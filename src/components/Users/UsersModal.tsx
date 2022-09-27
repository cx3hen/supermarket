import { Button, Modal, Form, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { RolesDataType, UsersDataType } from '../../type';
import { alterUsersInformation, createUser, getUserRoles, allotUserRole } from '../../service';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

interface IProps {
  rowDate?: UsersDataType;
  setRefresh: () => void;
}

const UsersModal = (props: IProps) => {
  const { rowDate, setRefresh } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState<RolesDataType[]>();

  const [form] = Form.useForm();

  useEffect(() => {
    isModalOpen &&
      getUserRoles().then(data => {
        setRoles(data);
      });
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (rowDate) {
      //修改
      form
        .validateFields()
        .then(values => {
          alterUsersInformation(rowDate.id, values).then(() => {
            message.success('修改成功');
          });
          allotUserRole(rowDate.id, values.rid);
        })
        .finally(() => {
          setRefresh();
          setIsModalOpen(false);
        });
    } else {
      //创建
      form.validateFields().then(values => {
        createUser(values).then(() => {
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
          添加用户
        </Button>
      )}
      <Modal title={rowDate ? '修改信息' : '添加用户'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form}>
          <Form.Item name={'username'} label="用户名" initialValue={rowDate?.username}>
            <Input disabled={rowDate !== undefined} />
          </Form.Item>
          {!rowDate && (
            <Form.Item name={'password'} label="密码" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          )}
          <Form.Item name={'email'} label="邮箱" initialValue={rowDate?.email} rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'mobile'} label="手机" initialValue={rowDate?.mobile} rules={[{ len: 11, required: true }]}>
            <Input />
          </Form.Item>
          {rowDate && (
            <Form.Item name={'rid'} label="角色" initialValue={rowDate?.role_name} rules={[{ required: true }]}>
              <Select style={{ width: 120 }}>
                {roles &&
                  roles?.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.roleName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default UsersModal;
