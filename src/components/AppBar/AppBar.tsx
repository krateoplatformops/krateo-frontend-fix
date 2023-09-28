import { Space } from 'antd';
import UserLogged from '../UserLogged/UserLogged';

import styles from './styles.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const AppBar = ({user}) => {
  
  return (
    <section className={styles.appBar}>
      <Space className={styles.left} direction='horizontal' size='large'>
        <Breadcrumb />
      </Space>
      <Space className={styles.right} direction='horizontal' size='large'>
        <UserLogged
          fullname={user.fullname}
          role={user.role}
          picture={user.picture}
        />
      </Space>
    </section>
  )
}

export default AppBar;