import { Space, Table, Switch, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getGoods, alterUsersState, deleteGood } from '../../service';
import GoodsModal from './GoodsModal';
import { GoodsDataType } from '../../type';
import DeletePopover from '../pubcomponents/DeletePopover';

const { Search } = Input;

const Goods = () => {
  const [data, setData] = useState<GoodsDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getGoods().then(res => {
      setData(res.goods);
    });
  }, [refresh]);

  const deleteService = (id: number) => {
    deleteGood(id).then(() => setRefresh(!refresh));
  };

  const columns: ColumnsType<GoodsDataType> = [
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '商品价格（元）',
      dataIndex: 'goods_price',
      key: 'goods_price',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '商品重量',
      dataIndex: 'goods_weight',
      key: 'goods_weight',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'add_time',
      key: 'add_time',
      render: (t, r) => <span>{t}</span>,
    },

    {
      title: '操作',
      key: 'action',
      render: (t, r) => (
        <Space size="middle">
          <GoodsModal rowDate={r} setRefresh={() => setRefresh(!refresh)} />
          <DeletePopover deleteService={async () => deleteService(r.goods_id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={e => {
          getGoods(e).then(data => {
            setData(data.goods);
          });
        }}
        style={{ width: 200, marginBottom: 20 }}
      />
      <GoodsModal setRefresh={() => setRefresh(!refresh)} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.goods_id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `总共 ${total || 0} 个项目`,
        }}
      />
    </>
  );
};

export default Goods;
