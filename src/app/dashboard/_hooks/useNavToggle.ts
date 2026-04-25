import { useState } from "react"

export function useNavToggle() {
  const [open, setOpen] = useState(true)
  const toggle = () => setOpen((prev) => !prev)
  return { open, toggle }
}
