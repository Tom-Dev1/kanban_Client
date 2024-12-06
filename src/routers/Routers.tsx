import { useDispatch, useSelector } from 'react-redux';
import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';
import {
  addAuth,
  authSelector,
  AuthState,
} from '../reduxs/reducers/authReducer';
import { useEffect, useState } from 'react';
import { localStorageDataNames } from '../constants/appInfors';
import { Spin } from 'antd';

export default function Routers() {
  const [isLoading, setIsLoading] = useState(false);

  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem(localStorageDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  // const handleCheckToken = async () => {

  // }
  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />;
}
