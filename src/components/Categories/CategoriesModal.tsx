import { Button, Modal, Form, Input, message, Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { CategoriesDataType } from '../../type';
import { createCategories, getCategories, alterCategories } from '../../service';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
  rowDate?: CategoriesDataType;
  setRefresh: () => void;
}
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const CategoriesModal = (props: IProps) => {
  const { rowDate, setRefresh } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [categories, setCategories] = useState<Option[]>();

  const displayRender = (labels: string[]) => labels[labels.length - 1];

  useEffect(() => {
    isModalOpen &&
      getCategories(2).then(data => {
        const newObj = JSON.parse(
          JSON.stringify(data)
            .replace(/cat_name/g, 'label')
            .replace(/cat_id/g, 'value')
        );
        setCategories(newObj);
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
          alterCategories(rowDate.cat_id, values).then(() => {
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
        console.log(values);
        const _values = { cat_name: values.cat_name, cat_pid: values.cat_pid[values.cat_pid.length - 1], cat_level: values.cat_pid.length };
        createCategories(_values).then(() => {
          setRefresh();
          setIsModalOpen(false);
          message.success('创建成功');
        });
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <>
      {rowDate ? (
        <EditOutlined onClick={showModal} />
      ) : (
        <Button type="primary" style={{ marginLeft: 10 }} onClick={showModal}>
          添加分类
        </Button>
      )}
      <Modal title={rowDate ? '修改信息' : '添加分类'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form} labelCol={{ span: 4 }}>
          <Form.Item name={'cat_name'} label="分类名称" initialValue={rowDate?.cat_name} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {!rowDate && (
            <Form.Item name={'cat_pid'} label="父级分类">
              <Cascader
                style={{ marginBottom: 20 }}
                options={categories}
                expandTrigger="click"
                displayRender={displayRender}
                placeholder="请选择"
                changeOnSelect
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default CategoriesModal;
