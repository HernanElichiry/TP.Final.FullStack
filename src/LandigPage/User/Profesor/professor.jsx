import React, { useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  ReadOutlined,
  LockOutlined,
  PushpinFilled,
  EditFilled,
  AuditOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";

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
  getItem("Hans", "1", <SettingOutlined />),
  getItem("Professor", "sub1", <UserOutlined />, [
    getItem(
      <Link to="change-password">Change Password</Link>,
      "3",
      <LockOutlined />
    ),
    getItem(<Link to="data">Data</Link>, "4", <EditFilled />),
  ]),
  getItem("Courses", "sub2", <ReadOutlined />, [
    getItem(<Link to="add-course">Add Courses</Link>, "6", <FormOutlined />),
    getItem(
      <Link to="my-courses-professor">My courses</Link>,
      "8",
      <AuditOutlined />
    ),
    getItem(
      <Link to="favorites-professor">Favorites</Link>,
      "10",
      <PushpinFilled />
    ),
  ]),
  getItem("Log out", "9", <CloseCircleOutlined />),
];

// Definición de los items del breadcrumb
const breadcrumbItems = [{ title: "Professor" }, { title: "Hans" }];

const ProfessorMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              textAlign: "center",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfessorMenu;
