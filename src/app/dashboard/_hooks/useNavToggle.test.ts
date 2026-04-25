import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useNavToggle } from "./useNavToggle"

describe("useNavToggle", () => {
  it("초기 상태는 open: true이다", () => {
    const { result } = renderHook(() => useNavToggle())
    expect(result.current.open).toBe(true)
  })

  it("toggle 호출 시 open이 false로 변경된다", () => {
    const { result } = renderHook(() => useNavToggle())
    act(() => result.current.toggle())
    expect(result.current.open).toBe(false)
  })

  it("toggle을 두 번 호출하면 open이 다시 true가 된다", () => {
    const { result } = renderHook(() => useNavToggle())
    act(() => result.current.toggle())
    act(() => result.current.toggle())
    expect(result.current.open).toBe(true)
  })
})
