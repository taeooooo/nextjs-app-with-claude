import StatsCard from "./_components/StatsCard"
import { getDashboardStats } from "./_lib/stats"
import styles from "./page.module.scss"

export default function DashboardPage() {
  const stats = getDashboardStats()

  return (
    <>
      <h1 className={styles.heading}>개요</h1>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
    </>
  )
}
