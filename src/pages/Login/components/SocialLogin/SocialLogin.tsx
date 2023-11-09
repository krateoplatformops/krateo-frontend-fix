import { Button } from "antd";
import styles from './styles.module.scss';
import { GithubOutlined } from "@ant-design/icons";
import { ReactElement } from "react";
import { AuthModeType } from "../../type";

type renderMethodsType = {
  name: string;
  icon: ReactElement;
  label: string;
  className: string;
  // url: string;
}

const renderMethodsData: renderMethodsType[] = [
  {
    name: "github",
    icon: <GithubOutlined />,
    label: "Sign in with GitHub",
    className: "github",
    // url: `https://github.com/login/oauth/authorize?client_id=77fcb37e2373f49fa771&state=${}`
  }
]

const SocialLogin = ({method}: {method: AuthModeType}) => {
  const renderData = renderMethodsData.find((el) => el.name === method.name);

  const getRandomString = () => {
    const rnd = Math.floor(Math.random() * Date.now()).toString(36);
    localStorage.setItem("KrateoSL", rnd);
    return rnd;
  };

  const onSubmit = () => {
    window.location.href = `${method.extensions?.authURL}?client_id=${method.extensions?.clientID}&state=${getRandomString()}`;
  }

  return (
    (method && renderData) ?
      <Button
        icon={renderData.icon}
        onClick={() => onSubmit()}
        className={styles[renderData.className]}
        size='large'
      >
        {renderData.label}
      </Button>
    :
     <></>
  )
}

export default SocialLogin;