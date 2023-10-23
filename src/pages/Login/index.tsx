import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel/Panel";
import { useLazyAuthenticationQuery, useGetAuthModesQuery, useLazySocialAuthenticationQuery } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import LoginForm from "./components/LoginForm/LoginForm";
import { LoginFormType } from "./type";
import { Divider, Result, message } from "antd";
import catchError from "../../utils/catchError";
import Skeleton from "../../components/Skeleton/Skeleton";
import getClientIdFromPath from "../../utils/getClientIdFromPath";
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
  /**
   * Steps
   * 1. call API to get list of auth modes
   * 2. render form if basic is present in list
   * 3. render social buttons for each social login in list
   * 
   * Functionalities
   * - submit the form and buttons to the endpoint read on API
   *  - save known response to store and localhost
   * - logout
   * 
   */

  const clientId = getClientIdFromPath();
  const [authentication, { isLoading: AuhLoading }] = useLazyAuthenticationQuery();
  const [socialAuthentication] = useLazySocialAuthenticationQuery();
  const {data, isLoading, isError, isFetching} = useGetAuthModesQuery(clientId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const messageKey = 'loginMessageKey';

  const onBasicSubmit = async (body: LoginFormType) => {
    const url = data?.find((el) => el.name === "basic")?.path;

    if (body.email && body.password && url) {
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

  const onSocialLogin = async (url: string) => {
    try {
      const userData = await socialAuthentication({url}).unwrap();
        dispatch(setUser(userData));
        navigate("/");
    } catch (err) {
      const errorMessage = (err as {data: {errorMessage: string}})?.data?.errorMessage;
      messageApi.open({key: messageKey, type: 'error', content: catchError(errorMessage)});
    }
  }

  const renderPanelContent = () => (
    data?.map((el) => {
      switch (el.name) {
        case "basic":
            return <>
              <LoginForm onSubmit={onBasicSubmit} isLoading={AuhLoading} />
              {(data.length > 1) && <Divider plain>OR</Divider> }
            </>
          break;
        
        default:
          return <SocialLogin methodName={el.name} onClick={onSocialLogin} />
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
          // isError ?
          // <Result status="error" />
          // :
          // isLoading || isFetching ?
          // <Skeleton />
          // :
          renderPanelContent()
        }
      />
    </section>
  )
}

export default Login;