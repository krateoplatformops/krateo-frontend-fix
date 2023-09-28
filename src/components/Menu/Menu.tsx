import { useEffect, useState } from "react"
import { Menu as AntMenu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const Menu = ({data}) => {
  const [items, setItems] = useState<MenuProps['items']>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const menuItems: MenuProps['items'] = data.map((el) => (
      {
        label: el.label,
        // icon: el.icon,
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
    <AntMenu
      onClick={(e) => changeRoute(e.key)}
      mode="inline"
      items={items}
    />
  )
}

export default Menu;