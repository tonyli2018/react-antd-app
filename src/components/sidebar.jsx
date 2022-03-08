import "../css/main.css";
import "antd/dist/antd.css";
import React, { Component } from "react";
import logoImg from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  // DesktopOutlined,
  // PieChartOutlined,
  FileOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderBar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  constructor(props) {
    super(props);
    if (!localStorage.getItem("token")) window.location.href = "/login";
  }

  //
  componentDidMount() {}

  render() {
    // console.log("Children", this.props.children);
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: "45px" }} />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<HomeOutlined />} title="Main Page">
              <Menu.Item key="3">
                <Link to="/history" className="nav-text">
                  History
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/test" className="nav-text">
                  Test
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="6">
                <Link to="/_userlist" className="nav-text">
                  User Lsit
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/sysVariables" className="nav-text">
                  System Setting
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            <img className="img" src={logoImg} alt="" />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{this.props.item}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.props.sub_item}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderBar;
