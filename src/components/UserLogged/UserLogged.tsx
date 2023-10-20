import { useEffect, useState } from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

type UserLoggedProps = {
  fullname: string;
  role: string;
  picture?: string;
  onLogout: () => void;
}

const UserLogged = ({fullname, role, picture, onLogout}: UserLoggedProps) => {
  const [ sign, setSign ] = useState('');

  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: '0',
    },
    {
      label: <Link to="">Logout</Link>,
      key: '1',
      onClick: onLogout
    },
  ];

  useEffect(() => {
    if (!picture) {
      const arr = fullname.split(" ");
      setSign(`${arr[0][0]}${arr[arr.length-1][0]}`);
    }
  }, [picture, fullname]);

  return (
    <Dropdown
      className={styles.userLogged}
      menu={{ items }}
      trigger={['click']}
    >
      <div>
        <div className={styles.details}>
          <Typography.Text className={styles.fullname}>{fullname}</Typography.Text>
          <Typography.Text className={styles.role}>{role}</Typography.Text>
        </div>
        <Avatar
          size="large"
          gap={2}
          src={picture}
        >
          {sign}
        </Avatar>
      </div>
    </Dropdown>
  )
}

export default UserLogged;