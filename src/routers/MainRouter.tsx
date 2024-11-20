import { Layout } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inventories, Orders } from '@/screens';
import { ReportScreen } from '@/screens';
import { Suppliers } from '@/screens';
import { ManageStore } from '@/screens';

import { HeaderComponent } from '../components';
import SiderComponent from '../components/SiderComponent';

import HomeScreen from '@/screens/HomeScreen';

const { Content, Footer } = Layout;
export default function MainRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Content className="mt-3 mb-2 container bg-white">
            <Routes>
              <Route index path="/*" element={<HomeScreen />} />
              <Route path="/inventory" element={<Inventories />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-store" element={<ManageStore />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
