import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import Menu from "../Menu/Menu";
import styles from "./styles.module.scss";

const { Header, Sider, Content } = AntLayout;

const Layout = ({menu, notifications}) => {
  // const [drawerData, setDrawerData] = useState<DrawerPanelType>();
  // const 
  return (
    <AntLayout className={styles.layout}>
      <Sider
        className={styles.sider}
        breakpoint="lg"
        collapsedWidth="50"
      >
        <Menu data={menu} />
      </Sider>
      <AntLayout>
        <Header className={styles.header}>
          <AppBar />
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout;