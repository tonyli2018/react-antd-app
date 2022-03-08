import React, { Component } from "react";
import { Form, Input, InputNumber, Button, Radio } from "antd";
import SideBar from "./sidebar";
import _axios from "./_axios";

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

class AddUser extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      formLayout: "inline",
      currentId: null,
      editing: false,
      newUser: {
        username: "admin",
        password: "",
        email: "",
        confirm: "",
        role: "",
        age: 10,
      },
    };
  }

  onFinish = (values: any) => {
    console.log(values);
    _axios
      .post("users/adduser", values)
      .then((res) => {
        //this.setState({ data: res.data });
        //const history = useHistory();
        window.location.href = "/userlist";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  changeName(e) {
    this.setState({
      newUser: { username: e.target.value, age: this.state.newUser.age },
    });
  }

  changeAge(e) {
    this.setState({ newUser: { name: this.state.newUser.name, age: e } });
  }

  render() {
    return (
      <SideBar item="Settings" sub_item="Add User">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name="username" label="Name" rules={[{ required: true }]}>
            <Input
              type="text"
              value="admin"
              placeholder="Name"
              onChange={this.changeName.bind(this)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
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
          <Form.Item name="age" label="age" rules={[{ required: true }]}>
            <InputNumber
              min={1}
              max={99}
              value={this.state.newUser.age}
              onChange={this.changeAge.bind(this)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </SideBar>
    );
  }
}

export default AddUser;
