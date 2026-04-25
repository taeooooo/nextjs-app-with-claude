import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactNode } from "react"
import Sidebar from "./Sidebar"

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("Sidebar", () => {
  it("모든 nav 항목을 렌더링한다", () => {
    render(<Sidebar />)
    expect(screen.getByText("개요")).toBeInTheDocument()
    expect(screen.getByText("사용자")).toBeInTheDocument()
    expect(screen.getByText("설정")).toBeInTheDocument()
  })

  it("토글 버튼 클릭 시 nav 항목이 첫 글자만 표시된다", async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    await user.click(screen.getByRole("button", { name: "사이드바 토글" }))

    expect(screen.queryByText("개요")).not.toBeInTheDocument()
    expect(screen.getByText("개")).toBeInTheDocument()
  })

  it("토글 버튼을 두 번 클릭하면 nav 항목이 다시 전체 표시된다", async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const toggleBtn = screen.getByRole("button", { name: "사이드바 토글" })
    await user.click(toggleBtn)
    await user.click(toggleBtn)

    expect(screen.getByText("개요")).toBeInTheDocument()
  })
})
