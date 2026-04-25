import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import DashboardPage from "./page"

describe("DashboardPage", () => {
  it("페이지 제목을 렌더링한다", () => {
    render(<DashboardPage />)
    expect(screen.getByRole("heading", { level: 1, name: "개요" })).toBeInTheDocument()
  })

  it("모든 stat 카드를 렌더링한다", () => {
    render(<DashboardPage />)
    expect(screen.getByText("총 사용자")).toBeInTheDocument()
    expect(screen.getByText("이번 달 매출")).toBeInTheDocument()
    expect(screen.getByText("활성 세션")).toBeInTheDocument()
    expect(screen.getByText("오류율")).toBeInTheDocument()
  })
})
