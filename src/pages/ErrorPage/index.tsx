import { Result } from "antd";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Result
      status="500"
      title="Ops!"
      subTitle="Something went wrong."
      extra={<Link to="/">Go to the Home page</Link>}
    />
  )
}

export default ErrorPage;