import styles from "./styles.module.scss";

const Widget2 = ({text}) => {
  return (
    <div className={styles.widget}>
      <h3>Widget 2</h3>
      <p>{text}</p>
    </div>
  )
}

export default Widget2;