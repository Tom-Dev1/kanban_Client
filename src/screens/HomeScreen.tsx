import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSelector,
  refreshToken,
  removeAuth,
} from '../reduxs/reducers/authReducer';
import handleAPI from '@/apis/handleAPI';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  const logout = () => {
    dispatch(removeAuth({}));
  };

  const getProducts = async () => {
    const api = `/storage/products`;
    try {
      const res = await handleAPI(api);
    } catch (error: any) {
      console.log(error);
      if (error.error === 'jwt expired') {
        handleRefreshToken();
      }
    }
  };

  const handleRefreshToken = async () => {
    const api = `auth/refresh-token?id=${auth._id}`;
    try {
      const res = await handleAPI(api);
      console.log('res', res);
      dispatch(refreshToken(res.data.token));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Button onClick={getProducts}> Logout</Button>
      </div>
    </>
  );
};

export default HomeScreen;
