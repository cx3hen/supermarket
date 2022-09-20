import { Space, Table, Switch, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getUsers, alterUsersState, deleteUser } from '../../service';
import UsersModal from './UsersModal';
import { UsersDataType } from '../../type';
import DeletePopover from '../pubcomponents/DeletePopover';

const { Search } = Input;

const Users = () => {
  const [data, setData] = useState<UsersDataType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then(res => {
      setData(res.users);
    });
  }, [refresh]);

  const deleteService = (id: number) => {
    deleteUser(id).then(() => setRefresh(!refresh));
  };

  const columns: ColumnsType<UsersDataType> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
      render: (t, r) => <span>{t}</span>,
    },
    {
      title: '状态',
      key: 'mg_state',
      dataIndex: 'mg_state',
      render: (t, r) => (
        <Switch
          defaultChecked={t}
          onClick={e => {
            alterUsersState(r.id, e).then(message.success('修改成功'));
          }}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (t, r) => (
        <Space size="middle">
          <UsersModal rowDate={r} setRefresh={() => setRefresh(!refresh)} />
          <DeletePopover deleteService={async () => deleteService(r.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={e => {
          getUsers(e).then(data => {
            setData(data.users);
          });
        }}
        style={{ width: 200, marginBottom: 20 }}
      />
      <UsersModal setRefresh={() => setRefresh(!refresh)} />
      <Table
        columns={columns}
        dataSource={data}
        rowKey={r => r.id}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `总共 ${total || 0} 个项目`,
        }}
      />
    </>
  );
};

export default Users;
