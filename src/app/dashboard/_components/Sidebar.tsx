"use client"

import Link from "next/link"
import clsx from "clsx"
import { useNavToggle } from "../_hooks/useNavToggle"
import styles from "./Sidebar.module.scss"

type NavItem = { href: string; label: string }

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "개요" },
  { href: "/dashboard/users", label: "사용자" },
  { href: "/dashboard/settings", label: "설정" },
]

export default function Sidebar() {
  const { open, toggle } = useNavToggle()

  return (
    <aside className={clsx(styles.sidebar, !open && styles.collapsed)}>
      <div className={styles.header}>
        {open && <span className={styles.logo}>Dashboard</span>}
        <button className={styles.toggleBtn} onClick={toggle} aria-label="사이드바 토글">
          {open ? "←" : "→"}
        </button>
      </div>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            {open ? item.label : item.label[0]}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
