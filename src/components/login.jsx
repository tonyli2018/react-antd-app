import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import { Layout, Card, ConfigProvider } from "antd";
import _axios from "./_axios";
import jwt from "jwt-decode"; // import dependency
import { useHistory } from "react-router-dom";
import { useState } from "react";

const { Content } = Layout;

const Login = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  //const errors = "User name password is not matching";

  const onFinish = (values) => {
    console.log("Success:", values);
    _axios
      .post("users/login", values)
      .then((res) => {
        console.log("status code:", res.request.status);
        const token = res.data;
        const user = jwt(token); // decode your token here
        console.log("user::", user);
        console.log("username::", user.username);
        console.log("role::", user.role);
        localStorage.setItem("token", res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log("err message", err.response.data);
        console.log("status", err.response.status);
        // validateUserName();
        setErrorMessage(err.response.data);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setErrorMessage("");
  };
  return (
    <Content style={{ margin: "100px 320px" }}>
      <Card style={{ width: 350, justifyContent: "center" }}>
        <span
          style={{ margin: "55px", justifyContent: "center", color: "red" }}
        >
          {errorMessage}
        </span>
        <br />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            onChange={handleChange}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              //{
              //  validator: validateUserName,
              // },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            onChange={handleChange}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              /*
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log("value::", value);
                  if (!value || getFieldValue("username") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),*/
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
};

export default Login;
