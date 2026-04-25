import StatsCard from "./_components/StatsCard"
import { getDashboardStats } from "./_lib/stats"
import styles from "./page.module.scss"

export default function DashboardPage() {
  const stats = getDashboardStats()

  return (
    <div>
      <h1 className={styles.heading}>개요</h1>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <StatsCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  )
}
