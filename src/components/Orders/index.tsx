import { Table, Switch, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getOrders, alterOrders } from '../../service';
import { OrderDataType } from '../../type';
import { formatDate } from '../../utils';

const Orders = () => {
  const [data, setData] = useState<OrderDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getOrders().then(res => {
      setData(res.goods);
    });
  }, [refresh]);

  const columns: ColumnsType<OrderDataType> = [
    {
      title: '订单编号',
      dataIndex: 'order_number',
      key: 'order_number',
      render: t => <span>{t}</span>,
    },
    {
      title: '用户id',
      dataIndex: 'user_id',
      key: 'user_id',
      render: t => <span>{t}</span>,
    },
    {
      title: '订单价格',
      dataIndex: 'order_price',
      key: 'order_price',
      render: t => <span>{t}</span>,
    },

    {
      title: '是否发货',
      dataIndex: 'is_send',
      key: 'is_send',
      render: (t, r) => (
        <>
          <Switch
            defaultChecked={t === '是' ? true : false}
            onClick={e => {
              const _e = e ? '1' : '0';
              alterOrders(r.order_id, _e).then(() => {
                message.success('修改成功');
                setRefresh(!refresh);
              });
            }}
          />
        </>
      ),
    },

    {
      title: '发票抬头',
      dataIndex: 'order_fapiao_title',
      key: 'order_fapiao_title',
      render: t => <span>{t}</span>,
    },
    {
      title: '下单时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: t => <span>{formatDate(t)}</span>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.order_id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `总共 ${total || 0} 个项目`,
        }}
      />
    </>
  );
};

export default Orders;
