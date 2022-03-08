//import { DashboardLayout } from "./Layout";
import SideBar from "./sidebar";
import { Table, Space, Button } from "antd";
import React, { Component } from "react";
import _axios from "./_axios";
import { useHistory } from "react-router-dom";
//const data = [];

class UserList extends Component {
  handleUpdateUser(e) {
    console.log(e);
  }
  state = {
    data: [
      {
        key: "1",
        username: "John Brown",
        email: "lichengguo1262626@153.com",
        lastUpdate: "2019-10-20",
      },
      {
        key: "2",
        username: "Tony Li",
        email: "lichengguo@153.com",
        lastUpdate: "2019-10-21",
      },
    ],
  };

  componentDidMount() {
    /*
    _axios
      .get("users/list")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });*/
  }
  onAddUser = () => {
    window.location.href = "/adduser";
  };

  render() {
    const columns = [
      { title: "Name", dataIndex: "username", key: "username" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Last Update", dataIndex: "lastUpdate", key: "lastUpdate" },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
          <span>
            <a onClick={() => this.handleUpdateUser(record)}>Edit</a>
            <span className="ant-divider" />
            <a onClick={() => this.handleDeleteUser(record)}>Delete</a>
          </span>
        ),
      },
    ];

    return (
      <SideBar item="Settings" sub_item="User List">
        <Button
          onClick={this.onAddUser}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add User
        </Button>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.password}</p>
            ),
            rowExpandable: (record) => record.username !== "Not Expandable",
          }}
          dataSource={this.state.data}
          rowKey="id"
        />
      </SideBar>
    );
  }
}

export default UserList;
