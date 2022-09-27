import { Button, Modal, Form, Input, message, Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { GoodsDataType } from '../../type';
import { alterGoodsInformation, createGoods, getCategories } from '../../service';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
  rowDate?: GoodsDataType;
  setRefresh: () => void;
}
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const displayRender = (labels: string[]) => labels[labels.length - 1];

const GoodsModal = (props: IProps) => {
  const { rowDate, setRefresh } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Option[]>();

  const [form] = Form.useForm();

  useEffect(() => {
    isModalOpen &&
      getCategories(3).then(data => {
        var newObj = JSON.parse(
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
  const onChange = (value: any[]) => {
    console.log(value);
  };
  const handleOk = () => {
    if (rowDate) {
      //修改
      form
        .validateFields()
        .then(values => {
          alterGoodsInformation(rowDate.goods_id, values).then(() => {
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
        createGoods(values).then(() => {
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
          添加商品
        </Button>
      )}
      <Modal title={rowDate ? '修改商品' : '添加商品'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form name="nest-messages" form={form}>
          <Form.Item name={'goods_name'} label="商品名称" initialValue={rowDate?.goods_name} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'goods_price'} label="商品价格" initialValue={rowDate?.goods_price} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={'goods_weight'} label="商品重量" initialValue={rowDate?.goods_weight} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={'goods_number'} label="商品数量" initialValue={rowDate?.goods_number} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {!rowDate && (
            <Form.Item name={'goods_cat'} label="商品类型" rules={[{ required: true }]}>
              <Cascader options={categories} expandTrigger="click" displayRender={displayRender} onChange={onChange} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default GoodsModal;
