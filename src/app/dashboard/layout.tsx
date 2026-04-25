import type { ReactNode } from "react"
import Sidebar from "./_components/Sidebar"
import styles from "./layout.module.scss"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
