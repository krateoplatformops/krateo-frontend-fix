import { useParams } from "react-router-dom";

const Auth = () => {
  const { error, error_description, error_uri, state } = useParams();

  return (
    <></>
  )
}

export default Auth;