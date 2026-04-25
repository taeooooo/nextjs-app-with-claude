현재 열려있거나 지정한 소스 파일의 테스트 파일을 생성한다.

## 사용법

```
/test-gen
/test-gen src/app/dashboard/_components/StatsCard.tsx
```

인자가 없으면 IDE에서 현재 열려있는 파일을 대상으로 한다.

## 절차

1. 대상 파일을 읽고 다음을 파악한다:
   - export된 함수/컴포넌트와 그 props/인자
   - 분기 로직 (조건부 렌더링, 상태 변화 등)
   - 외부 의존성 (`next/link`, `next/navigation` 등 mock 필요 여부)

2. 테스트 파일 경로를 결정한다:
   - 소스 파일과 **같은 폴더**에 배치
   - `Foo.tsx` → `Foo.test.tsx`, `useFoo.ts` → `useFoo.test.ts`

3. 이미 테스트 파일이 존재하면 덮어쓰기 전에 확인한다.

4. 아래 컨벤션으로 테스트를 작성한다:

**공통 규칙**
- `import { describe, it, expect, vi } from "vitest"` 명시적 import 사용
- CSS Module은 `identity-obj-proxy`로 처리되므로 `className`은 클래스명 문자열로 단언
- `next/link` mock 패턴:
  ```ts
  vi.mock("next/link", () => ({
    default: ({ children, href }: { children: ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    ),
  }))
  ```

**컴포넌트 (`*.tsx`)**
- `render()` + `screen` 쿼리로 UI 단언
- 인터랙션은 `userEvent.setup()` 사용
- 조건부 렌더링 분기마다 테스트 케이스 작성

**hook (`use*.ts`)**
- `renderHook()` + `act()` 사용
- 초기 상태, 상태 변화, 복원 케이스 작성

**lib/util (`.ts`)**
- 순수 함수 입출력 단언
- 반환 데이터의 구조와 필수 필드 검증

5. 생성한 테스트 파일 경로를 출력하고, 바로 실행해서 통과 여부를 확인한다:
   ```
   npx vitest run <테스트파일경로>
   ```
