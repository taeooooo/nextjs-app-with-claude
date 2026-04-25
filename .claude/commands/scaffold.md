새 Next.js route를 프로젝트 컨벤션에 맞게 스캐폴딩한다.

## 사용법

```
/scaffold <route-name>
```

예: `/scaffold users` → `src/app/users/` 구조 생성

## 절차

1. `$ARGUMENTS`에서 route 이름을 읽는다. 없으면 사용자에게 물어본다.

2. 다음 폴더와 파일을 생성한다:

**폴더**
- `src/app/<route>/_components/`
- `src/app/<route>/_hooks/`
- `src/app/<route>/_lib/`

**파일**

`src/app/<route>/page.tsx` — Server Component 기본 템플릿:
```tsx
import styles from "./page.module.scss"

export default function <Route>Page() {
  return (
    <h1 className={styles.heading}><Route></h1>
  )
}
```

`src/app/<route>/page.module.scss`:
```scss
.heading {
  font-size: 1.5rem;
  font-weight: 600;
}
```

`src/app/<route>/layout.tsx` — Server Component 기본 템플릿:
```tsx
import type { ReactNode } from "react"

export default function <Route>Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
```

3. 생성한 파일 목록을 출력하고, 다음 단계를 안내한다:
   - `_components/`, `_hooks/`, `_lib/`에 route 전용 파일 추가
   - 공유 코드는 `src/components/`, `src/hooks/`, `src/lib/`에 배치
   - Client Component가 필요하면 `_components/`에 `"use client"` 파일 분리
