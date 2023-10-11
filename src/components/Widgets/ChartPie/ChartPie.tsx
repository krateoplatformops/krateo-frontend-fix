import { theme } from 'antd';
import Panel from '../../Panel/Panel';
import { RingProgress } from '@ant-design/plots';
import styles from "./styles.module.scss";

type ChartPieType = {
  title: string;
  tooltip?: string;
  label?: string;
  value: number;
  total: number;
  status: "default" | "error" | "warning"
}

const { useToken } = theme;

const ChartPie = ({title, tooltip, label, value, total, status}: ChartPieType) => {
  const { token } = useToken();

  const getColor = () => {
    const bgcolor = token.colorBorder;

    switch (status) {
      case 'error':
        return [token.colorError, bgcolor]
        break;

      case 'warning':
        return [token.colorWarning, bgcolor]
        break;

      default:
        return [token.colorLink, bgcolor]
        break;
    }
  };

  const config = {
    animation:false,
    autoFit: true,
    // height: 100,
    // width: '100%',
    percent: 1 / total * value,
    innerRadius: .85,
    radius: 1,
    color: getColor(),
    statistic: undefined,
  }
  
  return (
    <Panel
      title={title}
      tooltip={tooltip}
      content={
        <div className={styles.chart}>
          <RingProgress {...config} />
          <div className={styles.details}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
            <div className={styles.total}>/{total}</div>
          </div>
        </div>
      }
      footer={[]}
    />
  )
}

export default ChartPie;