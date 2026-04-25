import Button from "@/components/Button"
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
      <div className={styles.actions}>
        <Button variant="primary">내보내기</Button>
        <Button variant="secondary">필터</Button>
        <Button variant="ghost">초기화</Button>
      </div>
    </>
  )
}
