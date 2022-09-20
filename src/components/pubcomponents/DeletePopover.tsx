import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
interface IProps {
  deleteService: () => Promise<void>;
}
const DeletePopover = (props: IProps) => {
  const { deleteService } = props;
  const [open, setOpen] = useState(false);
  const onClick = () => {
    deleteService();
  };
  const onCancel = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <>
          <Button style={{ marginRight: 40 }} type="default" onClick={onCancel}>
            取消
          </Button>

          <Button type="primary" onClick={onClick}>
            确定
          </Button>
        </>
      }
      title="提示：确定要删除吗？"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <CloseOutlined />
    </Popover>
  );
};
export default DeletePopover;
