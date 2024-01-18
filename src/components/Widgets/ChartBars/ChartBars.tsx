import { Progress } from "antd";
import Panel from "../../Panel/Panel";
import styles from "./styles.module.scss";

type ChartBarsData = {
  label: string;
  value: string;
  percentage: number;
  color: "success" | "normal" | "exception" | "active";
}

type ChartBarsType = {
  title: string;
  tooltip?: string;
  data: ChartBarsData[];
}

const ChartBars = ({title, tooltip, data}: ChartBarsType) => {
  return (
    <Panel
      title={title}
      tooltip={tooltip}
      content={
        <div className={styles.chart}>
          {
            data.map((el, i) => (
              <div key={`ChartBars_${i}`} className={styles.chartBarsRow}>
                <div className={styles.chartBarsData}>
                  <div className={styles.chartBarsLabel}>{el.label}</div>
                  <div className={styles.chartBarsValue}>{el.value}</div>
                </div>
                <Progress
                  className={styles.chartBarsProgress}
                  percent={el.percentage}
                  size="small"
                  status={el.color}
                  showInfo={false}
                />
              </div>
            ))
          }
        </div>
      }
      footer={[]}
    />
  )
}

export default ChartBars;