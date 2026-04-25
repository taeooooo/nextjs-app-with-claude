export type Stat = {
  id: string
  label: string
  value: string
  change: string
  positive: boolean
}

export function getDashboardStats(): Stat[] {
  return [
    { id: "total-users", label: "총 사용자", value: "12,430", change: "+8.2%", positive: true },
    { id: "monthly-revenue", label: "이번 달 매출", value: "₩4,820,000", change: "+12.5%", positive: true },
    { id: "active-sessions", label: "활성 세션", value: "342", change: "-3.1%", positive: false },
    { id: "error-rate", label: "오류율", value: "0.4%", change: "-0.1%", positive: true },
  ]
}
