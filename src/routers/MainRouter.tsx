import { Affix, Layout } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inventories, Orders } from '@/screens';
import { ReportScreen } from '@/screens';
import { Suppliers } from '@/screens';
import { ManageStore } from '@/screens';

import { HeaderComponent } from '../components';
import SiderComponent from '../components/SiderComponent';

import HomeScreen from '@/screens/HomeScreen';

const { Content } = Layout;
export default function MainRouter(): JSX.Element {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent />
        </Affix>
        <Layout
          style={{
            backgroundColor: 'white !important',
          }}
        >
          <Affix offsetTop={0}>
            <HeaderComponent />
          </Affix>
          <Content className="pt-3 container-fluid">
            <Routes>
              <Route index path="/" element={<HomeScreen />} />
              <Route path="/inventory" element={<Inventories />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-store" element={<ManageStore />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
