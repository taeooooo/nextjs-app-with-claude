import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import Button from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "디자인 시스템의 기본 버튼 컴포넌트입니다. `variant`로 의미를, `size`로 크기를 조절합니다. 네이티브 `<button>` 속성(`disabled`, `type`, `onClick` 등)을 모두 지원합니다.",
      },
    },
  },
  argTypes: {
    variant: {
      description: "버튼 스타일 변형. 용도에 맞게 선택한다.",
      control: "select",
      options: ["primary", "secondary", "ghost"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "버튼 크기",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      description: "비활성화 상태. 클릭 이벤트가 차단되고 opacity가 낮아진다.",
      control: "boolean",
    },
    children: {
      description: "버튼 내부 콘텐츠",
    },
    onClick: {
      description: "클릭 핸들러",
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: { docs: { description: { story: "주요 액션에 사용한다. 페이지당 하나만 사용하는 것을 권장한다." } } },
  args: { variant: "primary" },
}

export const Secondary: Story = {
  parameters: { docs: { description: { story: "보조 액션에 사용한다. Primary 버튼과 함께 배치할 때 적합하다." } } },
  args: { variant: "secondary" },
}

export const Ghost: Story = {
  parameters: { docs: { description: { story: "강조 없이 텍스트처럼 보이는 액션. 초기화·취소 등 부수적인 동작에 사용한다." } } },
  args: { variant: "ghost" },
}

export const Small: Story = {
  parameters: { docs: { description: { story: "테이블 행 안이나 좁은 공간에서 사용한다." } } },
  args: { size: "sm" },
}

export const Medium: Story = {
  parameters: { docs: { description: { story: "기본 크기. 대부분의 상황에서 사용한다." } } },
  args: { size: "md" },
}

export const Large: Story = {
  parameters: { docs: { description: { story: "랜딩 페이지나 강조가 필요한 CTA에 사용한다." } } },
  args: { size: "lg" },
}

export const Disabled: Story = {
  parameters: { docs: { description: { story: "조건이 충족되지 않아 액션을 취할 수 없는 상태." } } },
  args: { disabled: true },
}

export const AllVariants: Story = {
  parameters: { docs: { description: { story: "세 가지 variant를 한눈에 비교한다." } } },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { docs: { description: { story: "세 가지 size를 한눈에 비교한다." } } },
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
