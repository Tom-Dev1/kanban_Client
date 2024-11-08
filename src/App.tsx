import { ConfigProvider, message } from 'antd';
import Routers from './routers/Routers';

export default function App() {
  //provider
  message.config({
    top: 30,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'my-message',
    getContainer: () => document.body,
  });
  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
          components: {},
        }}
      >
        <Routers />
      </ConfigProvider>
    </>
  );
}
