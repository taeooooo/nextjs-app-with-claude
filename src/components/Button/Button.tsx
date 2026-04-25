"use client"
import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import styles from "./Button.module.scss"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** 버튼 스타일 변형. 용도에 맞게 선택한다. */
  variant?: "primary" | "secondary" | "ghost"
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg"
}

/** 디자인 시스템의 기본 버튼 컴포넌트. 네이티브 `<button>` 속성을 모두 지원한다. */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
