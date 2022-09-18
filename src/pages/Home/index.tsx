import React, { useEffect, useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { getMenu } from '../../service';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  type MenuItem = Required<MenuProps>['items'][number];
  //标签与id成映射关系
  const icons: Record<number, React.ReactNode> = {
    125: <UserOutlined />,
    103: <TeamOutlined />,
    101: <FileOutlined />,
    102: <PieChartOutlined />,
    145: <DesktopOutlined />,
  };

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  //左侧菜单配置
  const [items, setItems] = useState<MenuItem[]>();
  useEffect(() => {
    getMenu().then(data => {
      const itemsTemp: MenuItem[] = [];
      for (let i in data) {
        const childrenTemp: MenuItem[] = [];
        for (let j in data[i].children) {
          childrenTemp.push(getItem(data[i].children[j].authName, data[i].children[j].path));
        }
        itemsTemp.push(getItem(data[i].authName, data[i].id, icons[data[i].id], childrenTemp));
      }
      setItems(itemsTemp);
    });
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧菜单 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={e => {
            navigate(`/home/${e.key}`);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        {/* 头部 */}
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {/* 面包屑 */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          {/* 页面主要内容 */}
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
            {/* 子路由占位符 */}
            <Outlet />
          </div>
        </Content>
        {/* 底部 */}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
