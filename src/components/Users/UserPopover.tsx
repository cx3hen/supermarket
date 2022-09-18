import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { deleteUser } from '../../service';
import { UsersDataType } from '../../type';
interface IProps {
  rowDate: UsersDataType;

  setRefresh: () => void;
}
const UserPopover = (props: IProps) => {
  const { setRefresh, rowDate } = props;
  const [open, setOpen] = useState(false);
  const onClick = () => {
    deleteUser(rowDate.id).then(() => {
      setRefresh();
      setOpen(false);
    });
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <Button type="primary" onClick={onClick}>
          确定
        </Button>
      }
      title="提示：确定要删除该用户吗？"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <CloseOutlined />
    </Popover>
  );
};
export default UserPopover;
