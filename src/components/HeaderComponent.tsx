import { colors } from '@/constants/color';
import { auth } from '@/firebase/firebaseConfig';
import { authSelector, removeAuth } from '@/reduxs/reducers/authReducer';
import { Avatar, Button, Dropdown, Input, MenuProps, Space } from 'antd';
import { Notification, SearchNormal1 } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HeaderComponent = () => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: 'Logout',
      onClick: async () => {
        auth.signOut();
        dispatch(removeAuth({}));
        localStorage.clear();
        navigate('/');
      },
    },
  ];
  return (
    <div className="p-2 row bg-white m-0 ">
      <div className="col">
        <Input
          type="text"
          placeholder="Search product, supplier, order"
          size="large"
          style={{
            borderRadius: 100,
            width: '50%',
          }}
          prefix={<SearchNormal1 className="text-muted" size={20} />}
        />
      </div>
      <div className="col text-right">
        <Space>
          <Button
            type="text"
            icon={<Notification size={22} color={colors.gray600} />}
          ></Button>
          <Dropdown menu={{ items }}>
            <Avatar src={user.photoUrl} />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default HeaderComponent;
