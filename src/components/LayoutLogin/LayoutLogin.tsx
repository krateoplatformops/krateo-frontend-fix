import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo_big.svg";
import styles from "./styles.module.scss";

const LayoutLogin = () => {
  return (
    <div className={styles.layoutLogin}>
      <aside>
        <img src={logo} alt="Krateo | PlatformOps" />
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default LayoutLogin;