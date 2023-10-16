import { Progress } from "antd";
import Panel from "../../Panel/Panel";
import styles from "./styles.module.scss";

const mockData:ChartBarsData[] = [
  {
    label: "MySQL",
    value: "82",
    percentage: 23,
    color: "exception"
  },
  {
    label: "Git Service",
    value: "124",
    percentage: 68,
    color: "active"
  },
  {
    label: "AWS",
    value: "75",
    percentage: 16,
    color: "success"
  },
  {
    label: "Atlassian Jira",
    value: "93",
    percentage: 43,
    color: "normal"
  },
];

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
  data = mockData;

  return (
    <Panel
      title={title}
      tooltip={tooltip}
      content={
        <div className={styles.chart}>
          {
            data.map((el) => (
              <div className={styles.chartBarsRow}>
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