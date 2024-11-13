import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from './components/SocialLogin';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../reduxs/reducers/authReducer';
import { appInfor, localStorageDataNames } from '../../constants/appInfors';
import { auth } from '../../firebase/firebaseConfig';
import handleAPI from '@/apis/handleAPI';

const { Title, Paragraph, Text } = Typography;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogin = async (value: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res: any = await handleAPI('/auth/login', value, 'post');

      message.success(res.message);

      res.data && dispatch(addAuth(res.data));

      if (isRemember) {
        localStorage.setItem(
          localStorageDataNames.authData,
          JSON.stringify(res.data)
        );
      }
    } catch (error: any) {
      message.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card>
        <div className="text-center">
          <img style={{ width: 45 }} src={appInfor.logo} alt="" />
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
        <Button onClick={() => auth.signOut()}>Logout </Button>
        <div className="mt-4 mb-3">
          <Button
            loading={isLoading}
            onClick={() => form.submit()}
            type="primary"
            style={{ width: '100%' }}
            size="large"
          >
            Login
          </Button>
        </div>
        <SocialLogin isRemember={isRemember} />
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
