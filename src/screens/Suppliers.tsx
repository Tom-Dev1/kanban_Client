import { colors } from '@/constants/color';
import { ToggleSupplier } from '@/modals';
import { SupplierModel } from '@/models/SupplierModel';
import { Button, Space, Table, Typography } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Sort } from 'iconsax-react';
import { useState } from 'react';

const { Title } = Typography;
const Suppliers = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);

  const columns: ColumnProps<SupplierModel>[] = [];
  return (
    <div>
      <Table
        dataSource={[]}
        columns={columns}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-right">
              <Space>
                <Button
                  type="primary"
                  onClick={() => setIsVisibleModalAddNew(true)}
                >
                  Add Supplier
                </Button>
                <Button icon={<Sort size={20} color={colors.gray600} />}>
                  Filters
                </Button>
                <Button>Download all</Button>
              </Space>
            </div>
          </div>
        )}
      />
      <ToggleSupplier
        visible={isVisibleModalAddNew}
        onClose={() => setIsVisibleModalAddNew(false)}
        onAddNew={(value) => console.log(value)}
      />
    </div>
  );
};

export default Suppliers;
