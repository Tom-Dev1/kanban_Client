import { Layout, Menu, MenuProps, Typography } from 'antd';
import { Box, Chart, Home2, ProfileCircle } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { CiViewList } from 'react-icons/ci';
import { MdOutlineInventory } from 'react-icons/md';
import { appInfor } from '@/constants/appInfors';
import { colors } from '@/constants/color';

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: <Link to={'/'}>Dashboard</Link>,
      icon: <Home2 size={20} />,
    },
    {
      key: 'inventory',
      label: <Link to={'/inventory'}>Inventory</Link>,
      icon: <MdOutlineInventory size={20} />,
    },
    {
      key: 'Report',
      label: <Link to={'/report'}>Report</Link>,
      icon: <Chart size={20} />,
    },
    {
      key: 'Suppliers',
      label: <Link to={'/suppliers'}>Suppliers</Link>,
      icon: <ProfileCircle size={20} />,
    },
    {
      key: 'Orders',
      label: <Link to={'/orders'}>Orders</Link>,
      icon: <Box size={20} />,
    },
    {
      key: 'Manage Store',
      label: <Link to={'/manage-store'}>Manage Store</Link>,
      icon: <CiViewList size={20} />,
    },
  ];
  return (
    <Sider width={280} theme="light" style={{ height: '98vh' }}>
      <div className="p-2 d-flex">
        <img src={appInfor.logo} width={48} alt="/" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: colors.primary500,
            marginTop: 6,
            marginLeft: 3,
          }}
        >
          {appInfor.title}
        </Text>
      </div>
      <Menu items={items} theme="light" />
    </Sider>
  );
};

export default SiderComponent;
