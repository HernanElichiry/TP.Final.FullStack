import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// Función getItem para crear elementos de menú
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Definición de los items del menú
const items = [
  getItem('Hans', '1', <PieChartOutlined />),
  getItem('Professor', 'sub1', <UserOutlined />, [
    getItem(<Link to="change-password">Change Password</Link>, '3'),
    getItem(<Link to="data">Data</Link>, '4'),
  ]),
  getItem('Courses', 'sub2', <TeamOutlined />, [
    getItem(<Link to="add-courses">Add Courses</Link>, '6'),
    getItem(<Link to="my-courses">My courses</Link>, '8'),
    getItem(<Link to="favorites">Favorites</Link>, '10'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

// Definición de los items del breadcrumb
const breadcrumbItems = [
  { title: 'Professor' },
  { title: 'Hans' },
];

const ProfessorMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              textAlign: 'center',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProfessorMenu;