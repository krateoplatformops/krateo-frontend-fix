import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { LoginFormType } from '../../type';
import styles from './styles.module.scss';

type LoginType = {
  onSubmit: (data:LoginFormType) => void,
  isLoading: boolean
}

const LoginForm = ({
  onSubmit, isLoading
}: LoginType) => {

  return (
    <section className={styles.loginForm}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        disabled={isLoading}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Insert a valid email address' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Insert a password' }]}
        >
          <Input.Password />
        </Form.Item>

        <div className={styles.linkPassword}>
          <Link to="/forgotpassword">Forgot password?</Link>
        </div>
        
        <Form.Item>
          <Button className={styles.loginButton} type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default LoginForm;