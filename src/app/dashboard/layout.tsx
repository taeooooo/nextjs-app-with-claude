import Link from "next/link"
import styles from "./layout.module.scss"

const NAV_ITEMS = [
  { href: "/dashboard", label: "개요" },
  { href: "/dashboard/users", label: "사용자" },
  { href: "/dashboard/settings", label: "설정" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <span className={styles.logo}>Dashboard</span>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navItem}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
