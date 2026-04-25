import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import StatsCard from "./StatsCard"
import type { Stat } from "../_lib/stats"

const baseStat: Stat = {
  id: "test-id",
  label: "테스트 항목",
  value: "1,000",
  change: "+5%",
  positive: true,
}

describe("StatsCard", () => {
  it("label, value, change를 렌더링한다", () => {
    render(<StatsCard stat={baseStat} />)
    expect(screen.getByText("테스트 항목")).toBeInTheDocument()
    expect(screen.getByText("1,000")).toBeInTheDocument()
    expect(screen.getByText("+5%")).toBeInTheDocument()
  })

  it("positive가 true이면 positive 클래스를 적용한다", () => {
    render(<StatsCard stat={baseStat} />)
    expect(screen.getByText("+5%").className).toContain("positive")
  })

  it("positive가 false이면 negative 클래스를 적용한다", () => {
    render(<StatsCard stat={{ ...baseStat, change: "-3%", positive: false }} />)
    expect(screen.getByText("-3%").className).toContain("negative")
  })
})
