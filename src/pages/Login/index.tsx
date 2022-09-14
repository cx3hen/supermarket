import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { login } from '../../service';

const Login = () => {
  const [form] = Form.useForm();
  return (
    <Row className="login-container" align="middle">
      <Col span={8} offset={8} className="login-card">
        <Form name="basic" labelCol={{ span: 3 }} form={form}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.validateFields().then(values => {
                  login(values.username, values.password).then(res => {
                    console.log(res);
                  });
                });
              }}
            >
              提交
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
