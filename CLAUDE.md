# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 제공되는 가이드입니다.

@AGENTS.md

## `"use client"` 선언 규칙

- **hook 파일(`use*`)**: `"use client"` 작성하지 않는다. hook은 Client Component에서만 호출되므로 자명하다.
- **컴포넌트 파일**: 부모에 `"use client"`가 있어 자동으로 클라이언트 요소가 되더라도 **반드시 직접 선언**한다. 파일만 보고 클라이언트/서버 여부를 즉시 판단할 수 있어야 한다.

```ts
// ✅ hook — "use client" 없음
import { useState } from "react"
export function useNavToggle() { ... }

// ✅ component — 부모와 무관하게 직접 선언
"use client"
export default function Sidebar() { ... }
```

## 조건부 className

조건부 또는 다중 className은 반드시 `clsx`를 사용한다. 템플릿 리터럴로 직접 조합하지 않는다.

```tsx
// ✅
import clsx from "clsx"

className={clsx(styles.btn, isActive && styles.active)}             // 조건부
className={clsx(styles.text, isPrimary ? styles.primary : styles.secondary)}  // 조건부
className={clsx(geistSans.variable, geistMono.variable)}            // 단순 다중

// ❌
className={`${styles.btn} ${isActive ? styles.active : ""}`}
className={`${geistSans.variable} ${geistMono.variable}`}
```

## JSX 컨벤션

의미 없는 래퍼 `<div>`는 사용하지 않는다. 그룹핑만 필요한 경우 Fragment(`<>`)를 사용한다. 스타일이나 레이아웃 역할이 있는 경우에만 `<div>`를 쓴다.

```tsx
// ✅
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
)

// ❌
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
)
```

## React props 타입 컨벤션

props 타입에 `Readonly<>` 래퍼를 사용하지 않는다. React props는 기본적으로 불변이므로 중복이다.

```tsx
// ✅
function Layout({ children }: { children: ReactNode }) {}

// ❌
function Layout({ children }: Readonly<{ children: ReactNode }>) {}
```

## TypeScript 컨벤션

타입 선언은 `type`만 사용한다. `interface`는 사용하지 않는다.

```ts
// ✅
type User = { id: string; name: string }

// ❌
interface User { id: string; name: string }
```

React 타입은 `React.ReactNode` 대신 named import를 사용한다. 배열이나 list 렌더링에는 안정적인 고유 `id`를 key로 사용한다 (`index`나 `label` 같은 가변 값 금지).

```ts
// ✅
import type { ReactNode } from "react"
type Props = { children: ReactNode }

// ❌
type Props = { children: React.ReactNode }
```

```tsx
// ✅  — id는 타입에 반드시 포함
{items.map((item) => <Card key={item.id} ... />)}

// ❌
{items.map((item) => <Card key={item.label} ... />)}
```

## SCSS 컨벤션

SCSS 파일 내에서 중복되는 스타일 로직은 `%placeholder`로 추출해 `@extend`로 재사용한다.

```scss
// ✅
%nav-hoverable {
  &:hover { background: var(--nav-hover); }
}

.toggleBtn { @extend %nav-hoverable; }
.navItem   { @extend %nav-hoverable; }

// ❌ — 동일 블록 반복
.toggleBtn { &:hover { background: var(--nav-hover); } }
.navItem   { &:hover { background: var(--nav-hover); } }
```

색상 토큰은 `src/app/globals.scss`의 CSS custom properties로 관리한다. dark mode 포함 모든 색상 분기가 이 파일 한 곳에서만 이루어진다. 컴포넌트 SCSS에서 `@media (prefers-color-scheme: dark)` 색상 분기는 작성하지 않는다.

`src/styles/_variables.scss`는 `$sidebar-width`처럼 레이아웃·spacing 관련 컴파일 타임 상수만 둔다. 각 SCSS 파일에서 상대 경로로 `@use`한다. Turbopack은 `sassOptions.includePaths`를 지원하지 않으므로 절대/alias 경로는 사용할 수 없다.

```scss
// ✅ — 색상은 CSS custom properties로
.card {
  border: 1px solid var(--border-color);
  color: var(--label-color);
}

// ✅ — 레이아웃 상수는 SCSS 변수로
@use '../../../styles/variables' as *;

.sidebar {
  width: $sidebar-width;
}

// ❌ — 컴포넌트에서 색상 dark mode 분기
.card {
  border: 1px solid #e5e7eb;
  @media (prefers-color-scheme: dark) { border-color: #374151; }
}
```

Server Component에서 hook을 사용할 수 없다. hook이 필요한 UI는 `'use client'` 컴포넌트로 분리하고, Server Component인 layout/page는 그 컴포넌트를 자식으로 렌더링한다.

## 명령어

```bash
npm run dev        # 개발 서버 시작 (http://localhost:3000)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 빌드 실행
npm run lint       # ESLint
npm run test       # 테스트 watch 모드
npm run test:run   # 테스트 단회 실행 (CI용)
```

단일 파일만 실행:

```bash
npx vitest run src/app/dashboard/_components/StatsCard.test.tsx
```

## 테스트 컨벤션

테스트 환경은 **Vitest + React Testing Library + happy-dom**이다.

- 테스트 파일은 소스 파일과 같은 폴더에 `*.test.ts(x)` 로 배치한다.
- CSS Module은 `identity-obj-proxy`로 mock된다. `className`이 실제 해시가 아닌 클래스명 문자열로 반환된다.
- `next/link` 등 Next.js 모듈은 테스트 파일 안에서 `vi.mock()`으로 직접 mock한다.
- `globals: true` 설정으로 `describe`, `it`, `expect`, `vi` 등을 import 없이 사용할 수 있다. 단, 명시적 import(`import { describe, it, expect, vi } from "vitest"`)도 허용한다.

```ts
// next/link mock 패턴
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
```

## 프로젝트 폴더 구조 규칙

### 원칙

- **공유 목적** 코드는 `src/` 바로 아래 배치합니다.
- **특정 route 전용** 코드는 해당 route 폴더 내부에 `_` 접두사 폴더로 배치합니다.

```
src/
  app/                      ← routing 전용 (page, layout, route 파일만)
    dashboard/
      _components/          ← /dashboard 전용 컴포넌트
      _hooks/               ← /dashboard 전용 hook
      _lib/                 ← /dashboard 전용 유틸/데이터 로직
      page.tsx
  components/               ← 프로젝트 전체 공유 UI 컴포넌트
  hooks/                    ← 프로젝트 전체 공유 hook
  lib/                      ← 프로젝트 전체 공유 유틸/데이터 로직
```

### Path Alias

`tsconfig.json`에 `@/*` → `src/*` alias가 설정되어 있습니다. 공유 경로는 항상 alias로 접근합니다.

```ts
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { fetchUser } from '@/lib/api'
```

route 전용 코드는 상대 경로로 import합니다.

```ts
// app/dashboard/page.tsx 내부
import { DashboardHeader } from './_components/DashboardHeader'
```

---

## 아키텍처

이 프로젝트는 **Next.js 16.2.4**와 **React 19.2.4**를 사용하며, **App Router** (`src/app/`) 방식으로 구성되어 있습니다. 이전 Next.js 버전과 API 및 컨벤션이 크게 다르므로 — 코드 작성 전에 반드시 `node_modules/next/dist/docs/`를 먼저 확인하세요.

### App Router 파일 컨벤션

Route는 `src/app/` 아래에 위치합니다. 폴더 안에 `page.tsx` 또는 `route.ts`가 있을 때만 공개 route가 됩니다. 특수 파일 목록:

| 파일 | 역할 |
|------|---------|
| `layout.tsx` | 하위 segment를 감싸는 공유 UI |
| `page.tsx` | 페이지 UI (공개 routable) |
| `loading.tsx` | 해당 segment의 Suspense fallback |
| `error.tsx` | 해당 segment의 error boundary |
| `route.ts` | API endpoint (HTTP handler) |

폴더명 앞에 `_`를 붙이면 route에서 제외됩니다. `(group)` 폴더를 사용하면 URL에 영향 없이 layout을 공유할 수 있습니다.

### Server vs Client Components

모든 layout과 page는 **기본적으로 Server Component**입니다 — `async`로 선언하고 데이터를 직접 fetch할 수 있으며, 해당 코드는 브라우저로 전달되지 않습니다. 인터랙티비티(`onClick`, `useState`, `useEffect`)나 브라우저 API가 필요한 경우에만 파일 상단에 `'use client'`를 추가하세요.

### Dynamic route의 params는 Promise

Next.js 16에서 `params`(및 `searchParams`)는 Promise이므로 반드시 await해야 합니다:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

### 즉각적인 client-side navigation

`<Suspense>` boundary만으로는 즉각적인 navigation을 보장하기에 **충분하지 않습니다**. 즉시 navigate되어야 하는 route는 `unstable_instant`도 함께 export해야 합니다:

```tsx
export const unstable_instant = { prefetch: 'static' }
```

전체 패턴은 `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`를 참고하세요.

### Navigation import

`useRouter`, `usePathname`, `useSearchParams`는 `next/router`가 **아닌** `next/navigation`에서 import합니다. 선언적 navigation에는 `next/link`의 `<Link href="...">`를 사용하세요 (자동으로 prefetch됩니다).

### Server Functions (데이터 변경)

데이터 변경 작업에는 `'use server'` directive를 사용해 Server Function을 정의합니다. Server Function은 직접 POST 요청으로도 호출될 수 있으므로 — 모든 Server Function 내부에서 반드시 인증을 확인하세요.

```ts
export async function createPost(formData: FormData) {
  'use server'
  // 인증 후 데이터 변경
}
```
