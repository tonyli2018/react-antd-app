import { Button, Form, Input, InputNumber } from "antd";
import "antd/dist/antd.css";

function SystemSetting() {
  const [form] = Form.useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Form
      name="userForm"
      form={form}
      colon={false}
      onFinish={onSubmit}
      requiredMark="optional"
      labelAlign="left"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "The name is required.",
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Name can only include letters and numbers.",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            const value = e.target.value;
            if (value === "Apple") {
              form.setFieldsValue({ age: 7 });
            } else if (value === "Tom") {
              form.setFieldsValue({ age: 9 });
            } else {
              form.setFieldsValue({ age: 8 });
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            type: "integer",
            min: 0,
            max: 200,
            message: "Please input a valid age.",
          },
        ]}
      >
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
}

export default SystemSetting;
