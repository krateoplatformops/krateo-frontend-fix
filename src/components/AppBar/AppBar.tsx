import { Space } from 'antd';
import UserLogged from '../UserLogged/UserLogged';

import styles from './styles.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useSelector } from 'react-redux';
import { logout, selectLoggedUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react';

const AppBar = () => {
  const user = useSelector(selectLoggedUser);
  const userLS = JSON.parse(localStorage.getItem("user") ||"{}");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (user === null && !userLS.accessToken) {
      navigate("/login");
    }
  }, [navigate, user, userLS.accessToken]);

  return (
    <section className={styles.appBar}>
      <Space className={styles.left} direction='horizontal' size='large'>
        <Breadcrumb />
      </Space>
      <Space className={styles.right} direction='horizontal' size='large'>
        
      {user &&
        <UserLogged
          fullname={user.displayName}
          role="" // {user.role}
          picture={user.avatarURL}
          onLogout={onLogout}
        />
      }
      </Space>
    </section>
  )
}

export default AppBar;