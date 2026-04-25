import { describe, it, expect } from "vitest"
import { getDashboardStats } from "./stats"

describe("getDashboardStats", () => {
  it("4개의 stat을 반환한다", () => {
    expect(getDashboardStats()).toHaveLength(4)
  })

  it("각 stat은 필수 필드를 모두 포함한다", () => {
    getDashboardStats().forEach((stat) => {
      expect(stat).toHaveProperty("id")
      expect(stat).toHaveProperty("label")
      expect(stat).toHaveProperty("value")
      expect(stat).toHaveProperty("change")
      expect(stat).toHaveProperty("positive")
    })
  })

  it("id는 중복되지 않는다", () => {
    const stats = getDashboardStats()
    const ids = stats.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
