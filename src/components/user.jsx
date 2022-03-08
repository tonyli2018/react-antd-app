import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import SideBar from "./sidebar";
import _axios from "./_axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const User = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const location = useLocation();

  const [fields, setFields] = useState([
    {
      name: ["username"],
      value: location.data ? location.data.username : "",
    },
    {
      name: ["email"],
      value: location.data ? location.data.email : "",
    },
    {
      name: ["role"],
      value: location.data ? location.data.role : "",
    },
  ]);

  useEffect(() => {
    // console.log(location.pathname); // result: '/secondpage'
    if (location.data) {
      console.log(location.data);
    }
  });

  const history = useHistory();

  const onFinish = (values: any) => {
    console.log("Action", location.action);
    if (location.action === "update") {
      //update User Information
      values.id = location.data.id;
      console.log("data", values);
      _axios
        .put("users/updateUser", values)
        .then((res) => {
          //this.setState({ data: res.data });
          //const history = useHistory();
          history.push("/_userlist");
          //window.location.href = "/userlist";
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //Create user
      _axios
        .post("users/adduser", values)
        .then((res) => {
          //this.setState({ data: res.data });
          //const history = useHistory();
          //window.location.href = "/userlist";
          history.push("/_userlist");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <SideBar item="Settings" sub_item="Add User">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        fields={fields}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
      >
        <Form.Item name="username" label="Name" rules={[{ required: true }]}>
          <Input type="text" value="admin" placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          hidden={location.hidden ? location.hidden : false}
          name="password"
          label="Password"
          rules={[
            {
              required: location.hidden ? false : true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          hidden={location.hidden ? location.hidden : false}
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: location.hidden ? false : true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="User Role" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="staff">staff</Radio>
            <Radio value="admin">admin</Radio>
          </Radio.Group>
        </Form.Item>
        {/*
            <Form.Item
              name={["user", "age"]}
              label="Age"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name={["user", "website"]} label="Website">
              <Input />
            </Form.Item>
            <Form.Item name={["user", "introduction"]} label="Introduction">
              <Input.TextArea />
            </Form.Item>*/}

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </SideBar>
  );
};

export default User;
