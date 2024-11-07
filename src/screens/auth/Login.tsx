import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';

const { Title, Paragraph, Text } = Typography;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (value: { email: string; password: string }) => {
    // Call your login API here
    console.log('Received values of form: ', value);
  };
  return (
    <>
      <Card>
        <div className="text-center">
          <img
            style={{ width: 45 }}
            src={
              'https://firebasestorage.googleapis.com/v0/b/kanban-c0323.appspot.com/o/kanban-logo.png?alt=media&token=a3e8c386-57da-49a3-b9a2-94b8fd93ff83'
            }
            alt=""
          />
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">
            Wellcome back! Please enter your details
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
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
            <Input
              placeholder="Enter your email"
              allowClear
              maxLength={100}
              type="email"
            />
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

        <div className="row">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(val) => setIsRemember(val.target.checked)}
            >
              Remember me
            </Checkbox>
          </div>
          <div className="col text-right">
            <Link to={'/forgot-password'}>Forgot Password?</Link>
          </div>
        </div>

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
            <Text>Don't have an account?</Text>
            <Link to={'/sign-up'}>Sign Up</Link>
          </Space>
        </div>
      </Card>
    </>
  );
};

export default Login;
