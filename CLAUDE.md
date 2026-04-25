# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 제공되는 가이드입니다.

@AGENTS.md

## TypeScript 컨벤션

타입 선언은 `type`만 사용한다. `interface`는 사용하지 않는다.

```ts
// ✅
type User = { id: string; name: string }

// ❌
interface User { id: string; name: string }
```

## 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 빌드 실행
npm run lint     # ESLint
```

테스트 러너는 아직 설정되어 있지 않습니다.

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
