import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getRights } from '../../service';

import { RightsDataType } from '../../type';

const Roles = () => {
  const [data, setData] = useState<RightsDataType[]>();

  useEffect(() => {
    getRights().then(res => {
      setData(res);
    });
  }, []);

  const columns: ColumnsType<RightsDataType> = [
    {
      title: '权限名称',
      dataIndex: 'authName',
      key: 'authName',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '权限等级',
      dataIndex: 'level',
      key: 'level',
      render: (t, r) => <span>{t}</span>,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.id}
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

export default Roles;
