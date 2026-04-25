import clsx from "clsx"
import type { Stat } from "../_lib/stats"
import styles from "./StatsCard.module.scss"

export default function StatsCard({ stat }: { stat: Stat }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{stat.label}</span>
      <span className={styles.value}>{stat.value}</span>
      <span className={clsx(styles.change, stat.positive ? styles.positive : styles.negative)}>
        {stat.change}
      </span>
    </div>
  )
}
