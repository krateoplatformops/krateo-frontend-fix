import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel/Panel";
import { useLazyAuthenticationQuery, useGetAuthModesQuery } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import LoginForm from "./components/LoginForm/LoginForm";
import { LoginFormType } from "./type";
import { Divider, Result, message } from "antd";
import catchError from "../../utils/catchError";
import Skeleton from "../../components/Skeleton/Skeleton";
import getClientIdFromPath from "../../utils/getClientIdFromPath";
import SocialLogin from './components/SocialLogin/SocialLogin';

const Login = () => {
  const clientId = getClientIdFromPath();
  const [authentication, { isLoading: AuhLoading }] = useLazyAuthenticationQuery();
  const {data, isLoading, isError, isFetching} = useGetAuthModesQuery(clientId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const messageKey = 'loginMessageKey';

  const onBasicSubmit = async (body: LoginFormType) => {
    const url = data?.find((el) => el.kind === "basic")?.path;

    if (body.username && body.password && url) {
      try {
        const userData = await authentication({body, url}).unwrap();
        dispatch(setUser(userData));
        navigate("/");
      } catch (err) {
        const errorMessage = (err as {data: {errorMessage: string}})?.data?.errorMessage;
        messageApi.open({key: messageKey, type: 'error', content: catchError(errorMessage)});
      }
    } else {
      messageApi.open({key: messageKey, type: 'error', content: catchError("username_o_password_errati")});
    }
  };

  const renderPanelContent = () => (
    data?.map((el, i) => {
      switch (el.kind) {
        case "basic":
            return <div key={`login_${i}`}>
              <LoginForm onSubmit={onBasicSubmit} isLoading={AuhLoading} />
              {(data?.length > 1) && <Divider plain>OR</Divider> }
            </div>
          break;
        
        default:
          return <SocialLogin key={`login_${i}`} method={el} />
          break;
      }
    })
  )

  return (
    <section>
      {contextHolder}
      <Panel
        title="Welcome back"
        content={
          isError ?
          <Result status="error" />
          :
          isLoading || isFetching ?
          <Skeleton />
          :
          renderPanelContent()
        }
      />
    </section>
  )
}

export default Login;