import { useEffect, useState } from "react"
import { Menu as AntMenu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.scss";

const Menu = ({data}) => {
  const [items, setItems] = useState<MenuProps['items']>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const menuItems: MenuProps['items'] = data.map((el) => (
      {
        label: el.label,
        icon: el.icon,
        key: el.path

      }
    ))
    if (menuItems)
      setItems(menuItems);
  }, [data])

  const changeRoute = (key: string) => {
    navigate(key);
  }

  return (
    <section className={styles.menuBar}>
      <img className={styles.logo} src={logo} alt="Krateo DevOpsApp" />
      <AntMenu
        className={styles.menu}
        onClick={(e) => changeRoute(e.key)}
        mode="inline"
        items={items}
      />
    </section>
  )
}

export default Menu;