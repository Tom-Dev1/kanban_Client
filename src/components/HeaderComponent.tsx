import { colors } from '@/constants/color';
import { Avatar, Button, Input, Space } from 'antd';
import { Notification, SearchNormal1 } from 'iconsax-react';

const HeaderComponent = () => {
  return (
    <div className="p-2 row bg-white">
      <div className="col">
        <Input
          type="text"
          placeholder="Search..."
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
          <Avatar
            src={
              'https://content.triethocduongpho.net/wp-content/uploads/2019/03/8-696x435.jpg'
            }
          />
        </Space>
      </div>
    </div>
  );
};

export default HeaderComponent;
