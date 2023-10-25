import { Progress, Space } from "antd";
import Panel from "../../Panel/Panel";
import styles from "./styles.module.scss";

const mockData:ChartMultipleBarsDataType[] = [
  {
    label: "MySQL",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
      {
        value: "63",
        percentage: 23,
        color: "exception"
      },
    ]
  },
  {
    label: "Git Service",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
      {
        value: "63",
        percentage: 23,
        color: "exception"
      },
    ]
  },
  {
    label: "AWS",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
      {
        value: "63",
        percentage: 23,
        color: "exception"
      },
    ]
  },
  {
    label: "Atlassian Jira",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "success"
      },
      {
        value: "63",
        percentage: 23,
        color: "exception"
      },
    ]
  },
];

const _mockData:ChartMultipleBarsDataType[] = [
  {
    label: "MySQL",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
    ]
  },
  {
    label: "Git Service",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
    ]
  },
  {
    label: "AWS",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "normal"
      },
    ]
  },
  {
    label: "Atlassian Jira",
    bars: [
      {
        value: "82",
        percentage: 48,
        color: "success"
      },
    ]
  },
];

type ChartMultipleBarsDataType = {
  label: string;
  bars: {
    value: string;
    percentage: number;
    color: "success" | "normal" | "exception" | "active";
  }[]
}

type ChartMultipleBarsType = {
  title: string;
  tooltip?: string;
  data: ChartMultipleBarsDataType[];
}

const ChartMultipleBars = ({title, tooltip, data}: ChartMultipleBarsType) => {
  data = mockData;

  return (
    <Panel
      title={title}
      tooltip={tooltip}
      content={
        <div className={styles.chart}>
          {
            data.map((el, index) => (
              <div key={`multiplebar_${index}`} className={styles.chartBarsRow}>
                <div className={styles.chartBarsData}>
                  <div className={styles.chartBarsLabel}>{el.label}</div>
                  <Space size="large" >
                    {
                      el.bars.map((bar) => <span className={`${styles.chartBarsValue} ${styles[bar.color]}`} style={{}}>{bar.value}</span>)
                    }
                  </Space>
                </div>
                <div className={styles.chartBarsList}>
                  {
                    el.bars.map((bar, i) => (
                      <Progress
                        key={`progess_${i}`}
                        className={styles.chartBarsProgress}
                        percent={bar.percentage}
                        size="small"
                        status={bar.color}
                        showInfo={false}
                      />
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      }
      footer={[]}
    />
  )
}

export default ChartMultipleBars;