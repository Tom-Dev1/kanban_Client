import handleAPI from '@/apis/handleAPI';
import { colors } from '@/constants/color';
import { ToggleSupplier } from '@/modals';
import { SupplierModel } from '@/models/SupplierModel';
import {
  Button,
  message,
  Modal,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Edit2, Sort, UserRemove } from 'iconsax-react';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { confirm } = Modal;
const Suppliers = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);

  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState<number>(10);

  const renderIndex = (id: string) => {
    // const index = suppliers.findIndex((element) => element._id === id) + 1;
    // return `${index === 10 ? '' : page === 1 ? '' : page}${
    //   index === 10 ? `${page > 1 ? page + 1 : page}0` : index
    // }`;

    const indexInPage =
      suppliers.findIndex((element) => element._id === id) + 1;
    return (page - 1) * pageSize + indexInPage;
  };

  const columns: ColumnProps<SupplierModel>[] = [
    {
      dataIndex: '_id',
      title: '#',
      render: (id: string) => renderIndex(id),
      align: 'center',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Supplier Name',
    },
    {
      key: 'product',
      dataIndex: 'product',
      title: 'Product',
    },
    {
      key: 'contact',
      dataIndex: 'contact',
      title: ' Contact Number',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'type',
      dataIndex: 'isTaking',
      title: 'Type',
      render: (isTaking: boolean) => (
        <Text type={isTaking ? 'success' : 'danger'}>
          {isTaking ? 'Taking Return' : 'Not Taking Return'}
        </Text>
      ),
    },
    {
      key: 'on',
      dataIndex: 'active',
      title: 'On the way',
      render: (num) => num ?? '-',
    },
    {
      key: 'buttonContainer',
      dataIndex: '',
      title: 'Actions',
      fixed: 'right',
      align: 'right',
      render: (item: SupplierModel) => (
        <Space key={item._id}>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setIsVisibleModalAddNew(true);
                setSupplierSelected(item);
              }}
              type="text"
              icon={<Edit2 size={18} className="text-info" />}
            />
          </Tooltip>

          <Button
            onClick={() =>
              confirm({
                title: 'Confirm',
                content: 'Are you sure to delete this item?',
                onOk: () => removeSuppliers(item._id),
                onCancel() {},
              })
            }
            type="text"
            icon={<UserRemove size={18} className="text-danger" />}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getSuppliers();
  }, [page, pageSize]);

  const getSuppliers = async () => {
    const api = `/supplier?page=${page}&pageSize=${pageSize}`;
    setIsLoading(true);
    try {
      const res = await handleAPI(api);

      res.data && setSuppliers(res.data.items);

      const items: SupplierModel[] = [];

      res.data.items.forEach((item: any, index: number) => {
        items.push({
          index: page - 1 + pageSize + (index + 1),
          ...item,
        });
      });

      setSuppliers(items);
      setTotal(res.data.total);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAddDemoData = () => {

  //   demoData.forEach(async (item) => {
  //     const data = {
  //       name: item.title,
  //       product: 'video',
  //       email: 'aa@gmail.com',
  //       active: '12',
  //       categories: '',
  //       ' price ': Math.floor(Math.random() * 10000),
  //       contact: '12344578',
  //       isTaking: 0,
  //       slug: replaceName(item.title),
  //     };
  //     const api = `supplier/add-new`;
  //     try {
  //       await handleAPI(api, data, 'post');
  //       console.log('Add done');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  const removeSuppliers = async (id: string) => {
    setIsLoading(true);
    try {
      //soft delete
      // await handleAPI(`/supplier/update?id=${id}`, { isDeleted: true }, 'put');
      await handleAPI(`/supplier/remove?id=${id}`, {}, 'delete');
      await getSuppliers();
      message.success('Supplier removed successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Button onClick={handleAddDemoData}>Add Demo Data</Button> */}
      <Table
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          total,
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
        scroll={{
          y: 'calc(100vh - 300px)',
        }}
        dataSource={suppliers}
        rowKey={(record) => record._id}
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
        onClose={() => {
          supplierSelected && getSuppliers();
          setSupplierSelected(undefined);
          setIsVisibleModalAddNew(false);
        }}
        onAddNew={(val) => setSuppliers([...suppliers, val])}
        supplier={supplierSelected}
      />
    </>
  );
};

export default Suppliers;
