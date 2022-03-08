import SideBar from "./sidebar";
import { Table, Button, Space, Popconfirm } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import _axios from "./_axios";
import "../css/main.css";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";

const USL = () => {
  const columns = [
    { title: "Name", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Last Update", dataIndex: "lastUpdate", key: "lastUpdate" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdateUser(record)}>Edit</a>
          {/*<a onClick={() => handleDeleteUser(record)}>Delete</a>*/}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteUser(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");

  const history = useHistory();
  const handleOnAddUser = () =>
    history.push({
      pathname: "/user",
      action: "add",
    });
  const handleUpdateUser = (record) => {
    //console.log(record);
    history.push({
      pathname: "/user",
      data: record,
      hidden: true,
      action: "update",
    });
  };
  const handleDeleteUser = (record) => {
    console.log("data", data);
    _axios.delete(`/users/${record.id}`);
    const _data = data.filter((item) => item.id !== record.id);
    setData(_data);
    //history.push("/_userlist");
  };
  //let data = [
  /*{
      id: "1",
      username: "John Brown",
      email: "lichengguo1262626@153.com",
      lastUpdate: "2019-10-20",
    },
    {
      id: "2",
      username: "Tony Li",
      email: "lichengguo@153.com",
      lastUpdate: "2019-10-21",
    },*/
  //];

  //const userDataList = useRef(null);

  useEffect(() => {
    console.log("useEffect was called!");
    _axios
      .get("users/list")
      .then((res) => {
        setData(res.data);
        setLoading(false);

        // userDataList.current.value = res.data;
        //console.log("data", data);
      })
      .catch((err) => {
        //console.log("err message", err.response.data);
        //console.log("status", err.response.status);
        //if (err.response.status === 403) history.push("/login");
        //  else history.push("/error");
      });
  }, [value]);

  return (
    <SideBar item="Settings" sub_item="User List">
      <Button
        onClick={handleOnAddUser}
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
        dataSource={data}
        //loading={{ indicator: <div>loading...</div> }}
        //loading={{ indicator: <div>loading...</div> }}
        loading={loading}
        rowKey="id"
      ></Table>
    </SideBar>
  );
};

export default USL;
