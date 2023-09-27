import styles from "./styles.module.scss";

const Widget1 = ({text}) => {
  return (
    <div className={styles.widget}>
      <h3>Widget 1</h3>
      <p>{text}</p>
    </div>
  )
}

export default Widget1;