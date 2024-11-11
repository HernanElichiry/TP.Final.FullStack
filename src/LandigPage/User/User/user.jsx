import { useState } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  ReadOutlined,
  LockOutlined,
  PushpinFilled,
  EditFilled,
  AuditOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";

const { Header, Content, Sider } = Layout;

function Sidebar() {
  const { user, logout } = useUser();
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const email = user?.email || "User";

  const breadcrumbItems = [{ title: "User" }, { title: email }];

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
    getItem(email, "1", <SettingOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem(
        <Link to="change-password">Change Password</Link>,
        "3",
        <LockOutlined />
      ),
      getItem(<Link to="data">Data</Link>, "4", <EditFilled />),
    ]),
    getItem("Courses", "sub2", <ReadOutlined />, [
      getItem(
        <Link to="my-courses-alumno">My courses</Link>,
        "6",
        <AuditOutlined />
      ),
      getItem(
        <Link to="favorites-alumno">Favorites</Link>,
        "8",
        <PushpinFilled />
      ),
    ]),
    getItem("Log out", "9", <LogoutOutlined />),
  ];

  const handleMenuClick = (e) => {
    if (e.key === "9") {
      logout();
    }
  };

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
          onClick={handleMenuClick}
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
}

export default Sidebar;
