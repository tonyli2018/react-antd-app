import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import SideBar from "./sidebar";

const onSubmit = (data) => console.log("data", data);

const CustomizedForm = ({ onChange1, fields1 }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields1}
    onFinish={onSubmit}
    onFieldsChange={(_, allFields) => {
      onChange1(allFields);
    }}
  >
    <Form.Item
      name="username"
      label="Username"
      rules={[
        {
          required: true,
          message: "Username is required!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item name="age" label="age" rules={[{ required: true }]}>
      <InputNumber />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 4,
        span: 16,
      }}
    >
      <Button htmlType="submit">Submit</Button>
    </Form.Item>
  </Form>
);

const History = () => {
  const [fields, setFields] = useState([
    {
      name: ["username"],
      value: "Ant Design",
    },
    {
      name: ["age"],
      value: 10,
    },
  ]);

  return (
    <SideBar item="Main Page" sub_item="History">
      <>
        <CustomizedForm
          fields1={fields}
          onChange1={(newFields1) => {
            setFields(newFields1);
          }}
        />
        <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
      </>
    </SideBar>
  );
};

export default History;
