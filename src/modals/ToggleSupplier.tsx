import handleAPI from '@/apis/handleAPI';
import { SupplierModel } from '@/models/SupplierModel';
import { replaceName } from '@/utils/replaceName';
import { uploadFile } from '@/utils/UpLoadFile';
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
} from 'antd';
import { User } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { colors } from '../constants/color';
import { demoData } from '@/data/demodata';

const { Paragraph } = Typography;
interface Props {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: SupplierModel) => void;
  supplier?: SupplierModel;
}
const ToggleSupplier = (props: Props) => {
  const { visible, onAddNew, onClose, supplier } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();

  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);

      setIsTaking(supplier.isTaking === true);
    }
  }, [supplier]);
  const addNewSupplier = async (values: any) => {
    setIsLoading(true);

    const data: any = {};
    const api = `/supplier/${
      supplier ? `update?id=${supplier._id}` : 'add-new'
    }`;

    for (const i in values) {
      data[i] = values[i] ?? '';
    }

    data.price = values.price ? parseInt(values.price) : 0;
    data.isTaking = isTaking ? 1 : 0;

    if (file) {
      data.photoUrl = await uploadFile(file);
    }
    console.log(data);

    data.slug = replaceName(values.name);

    try {
      const res: any = await handleAPI(api, data, supplier ? 'put' : 'post');
      message.success(res.message);
      !supplier && onAddNew(res.data);

      demoData.forEach((item) => console.log(item));
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    form.resetFields();
    setFile(undefined);
    onClose();
  };
  return (
    <Modal
      closable={!isLoading}
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      title={supplier ? 'Update' : 'Add Supplier'}
      okButtonProps={{
        loading: isLoading,
      }}
      okText={supplier ? 'Update' : 'Add Supplier'}
      cancelText="Discard"
      onOk={() => form.submit()}
    >
      <Form
        disabled={isLoading}
        onFinish={addNewSupplier}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        size="large"
        form={form}
      >
        <label htmlFor="inpFile" className="p-2 mb-3 row">
          {file ? (
            <Avatar size={100} src={URL.createObjectURL(file)} />
          ) : supplier ? (
            <Avatar size={100} src={supplier.photoUrl} />
          ) : (
            <Avatar
              size={100}
              style={{ backgroundColor: 'white', border: '1px dashed #e0e0e0' }}
            >
              <User size={80} color={colors.gray600} />
            </Avatar>
          )}

          <div className="ml-3">
            <Paragraph className="text-muted m-0">Drag image here</Paragraph>
            <Paragraph className="text-muted mb-2">Or</Paragraph>
            <Button onClick={() => inpRef.current.click()} type="link">
              Browse image
            </Button>
          </div>
        </label>

        <Form.Item
          name={'name'}
          label="Supplier Name"
          rules={[
            {
              required: true,
              message: 'Enter supplier name',
            },
          ]}
        >
          <Input placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item name={'product'} label="Product Name">
          <Input placeholder="Enter Product Name" allowClear />
        </Form.Item>
        <Form.Item name={'email'} label="Email">
          <Input placeholder="Enter Email Name" allowClear type="email" />
        </Form.Item>
        <Form.Item name={'active'} label="Active">
          <Input placeholder="" allowClear type="number" />
        </Form.Item>
        <Form.Item name={'categories'} label="Category Name">
          <Select options={[]} placeholder="Category" />
        </Form.Item>
        <Form.Item name={'price'} label="Buy Price">
          <Input placeholder="Enter buying price" type="number" allowClear />
        </Form.Item>
        <Form.Item name={'contact'} label="Contact Name">
          <Input placeholder="Enter supplier contact number" allowClear />
        </Form.Item>
        <Form.Item label="Type">
          <div className="mb-2">
            <Button
              size="middle"
              onClick={() => setIsTaking(false)}
              type={isTaking === false ? 'primary' : 'default'}
            >
              Not taking return
            </Button>
          </div>
          <Button
            size="middle"
            onClick={() => setIsTaking(true)}
            type={isTaking ? 'primary' : 'default'}
          >
            Taking return
          </Button>
        </Form.Item>
      </Form>
      <div className="d-none">
        <input
          accept="image/*"
          ref={inpRef}
          type="file"
          name=""
          id=""
          onChange={(val: any) => setFile(val.target.files[0])}
        ></input>
      </div>
    </Modal>
  );
};

export default ToggleSupplier;
//toggles
