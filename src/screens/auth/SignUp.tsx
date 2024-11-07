import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (value: { email: string; password: string }) => {
    // Call your login API here
    console.log('Received values of form: ', value);
  };
  return (
    <>
      <Card style={{ width: '60%' }}>
        <div className="text-center">
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">Free Trial</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          {' '}
          <Form.Item
            label="Name"
            name={'name'}
            rules={[
              {
                required: true,
                message: 'Please input your name',
              },
            ]}
          >
            <Input placeholder="Enter your name" allowClear type="name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input placeholder="Enter your email" allowClear type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Please input your Password"!',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              maxLength={100}
              type="email"
            />
          </Form.Item>
        </Form>

        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{ width: '100%' }}
            size="large"
          >
            Login
          </Button>
        </div>
        <SocialLogin />
        <div className="mt-4 text-center">
          <Space>
            <Text>Already have an account?</Text>
            <Link to={'/'}>Login</Link>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default SignUp;
