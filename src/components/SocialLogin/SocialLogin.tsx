import { Button } from "antd";
import styles from './styles.module.scss';
import { GithubOutlined } from "@ant-design/icons";
import { ReactElement } from "react";

type methodsType = {
  name: string;
  icon: ReactElement;
  label: string;
  className: string;
  url: string;
}

const methods: methodsType[] = [
  {
    name: "github.login",
    icon: <GithubOutlined />,
    label: "Sign in with GitHub",
    className: "github",
    url: "v1/auth/github/login"
  }
]

type SocialLoginType = {
  methodName: string;
  onClick: (url: string) => void;
}

const SocialLogin = ({methodName, onClick}: SocialLoginType) => {
  const method = methods.find((el) => el.name === methodName);

  return (
    (method) ?
      <Button
        icon={method.icon}
        onClick={() => onClick(method.url)}
        className={styles[method.className]}
      >{method.label}</Button>
    :
     <></>
  )
}

export default SocialLogin;