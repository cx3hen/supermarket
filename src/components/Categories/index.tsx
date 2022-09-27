import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { deleteCategories, getCategories } from '../../service';
import DeletePopover from '../pubcomponents/DeletePopover';
import CategoriesModal from './CategoriesModal';

import { CategoriesDataType } from '../../type';

const Categories = () => {
  const [data, setData] = useState<CategoriesDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getCategories(3).then(res => {
      setData(res);
    });
  }, [refresh]);

  const deleteService = (id: number) => {
    deleteCategories(id).then(() => setRefresh(!refresh));
  };

  const columns: ColumnsType<CategoriesDataType> = [
    {
      title: '分类名称',
      dataIndex: 'cat_name',
      key: 'cat_name',
      render: t => <span>{t}</span>,
    },
    {
      title: '是否有效',
      dataIndex: 'cat_deleted',
      key: 'cat_deleted',
      render: (t, r) => <span>{t ? '无效' : '有效'}</span>,
    },
    {
      title: '排序',
      dataIndex: 'cat_level',
      key: 'cat_level',
      render: (t, r) => <span>{t + 1 + '级'}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (t, r) => (
        <Space size="middle">
          <CategoriesModal rowDate={r} setRefresh={() => setRefresh(!refresh)} />
          <DeletePopover deleteService={async () => deleteService(r.cat_id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <CategoriesModal setRefresh={() => setRefresh(!refresh)} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.cat_id}
        style={{ marginTop: 20 }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `总共 ${total || 0} 个项目`,
        }}
      />
    </>
  );
};

export default Categories;
