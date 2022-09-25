import { Button, Modal, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { ParamsDataType } from '../../type';
import { alterParam, createParam } from '../../service';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
  rowDate?: ParamsDataType;
  id?: number;
  setRefresh: () => void;
}

const ParamsModal = (props: IProps) => {
  const { rowDate, setRefresh, id } = props;

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
          alterParam(rowDate.cat_id, rowDate.attr_id, values).then(() => {
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
        createParam(id!, values).then(() => {
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
          添加属性
        </Button>
      )}
      <Modal title={rowDate ? '修改商品' : '添加商品'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form}>
          <Form.Item name={'attr_name'} label="属性名称" initialValue={rowDate?.attr_name} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ParamsModal;
