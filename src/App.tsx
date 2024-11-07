import { ConfigProvider } from 'antd';
import Routers from './routers/Routers';

export default function App() {
  //provider
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
