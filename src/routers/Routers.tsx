import { useDispatch, useSelector } from 'react-redux';
import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';
import { authSelector, AuthState } from '../reduxs/reducers/authReducer';

export default function Routers() {
  const auth: AuthState = useSelector(authSelector);
  const dispactch = useDispatch();
  return !auth.token ? <AuthRouter /> : <MainRouter />;
}
