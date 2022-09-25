import { Space, Table, Cascader, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getParams, deleteParam, getCategories } from '../../service';
import { ParamsDataType } from '../../type';
import DeletePopover from '../pubcomponents/DeletePopover';
import ParamsModal from './ParamsModal';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}
const displayRender = (labels: string[]) => labels[labels.length - 1];

const Params = () => {
  const [data, setData] = useState<ParamsDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [categories, setCategories] = useState<Option[]>();
  const [id, setId] = useState<number>();

  useEffect(() => {
    getCategories().then(data => {
      const newObj = JSON.parse(
        JSON.stringify(data)
          .replace(/cat_name/g, 'label')
          .replace(/cat_id/g, 'value')
      );
      setCategories(newObj);
    });
  }, []);

  useEffect(() => {
    getParams(id!).then(data => {
      const newObj = JSON.parse(JSON.stringify(data));
      newObj.forEach((item: ParamsDataType) => {
        item.children = [{ attr_vals_children: item.attr_vals }];
      });
      console.log('data', data);

      console.log('newObj', newObj);
      setData(newObj);
    });
  }, [id, refresh]);

  const onChange = (value: any[]) => {
    if (value.length !== 3) {
      message.error('注意：只允许为第三级分类的属性设置相关参数！');
    }
    setId(value[2]);
  };

  const deleteService = (id: number, attr_id: number) => {
    deleteParam(id, attr_id).then(() => setRefresh(!refresh));
  };

  const columns: ColumnsType<ParamsDataType> = [
    {
      title: '属性名称',
      dataIndex: 'attr_name',
      key: 'attr_name',
      render: t => <span>t</span>,
      children: [
        {
          title: '属性值',
          key: 'attr_vals ',
          render: r => (
            <span>
              {r.attr_name}
              {r.attr_vals_children}
            </span>
          ),
        },
      ],
    },

    {
      title: '操作',
      key: 'action',
      render: (t, r) =>
        r.children ? (
          <Space size="middle">
            <ParamsModal rowDate={r} setRefresh={() => setRefresh(!refresh)} />
            <DeletePopover deleteService={async () => deleteService(id!, r.attr_id)} />
          </Space>
        ) : (
          ''
        ),
    },
  ];

  return (
    <>
      <span>请选择商品类型：</span>
      <Cascader
        style={{ marginBottom: 20 }}
        options={categories}
        expandTrigger="click"
        displayRender={displayRender}
        onChange={onChange}
        placeholder="请选择"
      />
      {id && <ParamsModal id={id} setRefresh={() => setRefresh(!refresh)} />}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.attr_id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `总共 ${total || 0} 个项目`,
        }}
      />
    </>
  );
};

export default Params;
