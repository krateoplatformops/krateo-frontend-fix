import { Result } from "antd";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Result
      status="404"
      title="404 Page not found"
      subTitle="We can't find the page you're looking for"
      extra={<Link to="/">Go to the Home page</Link>}
    />
  )
}

export default Page404;