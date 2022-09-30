import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getUserRoles, deleteRole } from '../../service';
import DeletePopover from '../pubcomponents/DeletePopover';
import RolesModal from './RolesModal';

import { RolesDataType } from '../../type';

const Roles = () => {
  const [data, setData] = useState<RolesDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getUserRoles().then(res => {
      setData(res);
    });
  }, [refresh]);

  const deleteService = (id: number) => {
    deleteRole(id).then(() => setRefresh(!refresh));
  };

  const columns: ColumnsType<RolesDataType> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      children: [
        {
          title: '角色权限',
          dataIndex: 'authName',
          key: 'authName ',
          render: (t, r) => (
            <span>
              {r.roleName}
              {t}
            </span>
          ),
        },
      ],
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (t, r) =>
        r.roleName ? (
          <Space size="middle">
            <RolesModal rowDate={r} setRefresh={() => setRefresh(!refresh)} />
            <DeletePopover deleteService={async () => deleteService(r.id)} />
          </Space>
        ) : (
          ''
        ),
    },
  ];

  return (
    <>
      <RolesModal setRefresh={() => setRefresh(!refresh)} />
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
