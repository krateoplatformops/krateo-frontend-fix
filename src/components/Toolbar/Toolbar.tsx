import { Space } from "antd";

const Toolbar = ({children}: {children: React.ReactElement}) => {
    return (
        <Space style={{width: '100%', justifyContent: 'end'}}>
            {children}
        </Space>
    )
}

export default Toolbar;