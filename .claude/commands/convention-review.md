현재 브랜치에서 변경된 파일을 CLAUDE.md 컨벤션 기준으로 리뷰한다.

## 절차

1. 변경된 파일 목록을 확인한다:
   ```
   git diff --name-only HEAD
   git diff --name-only --cached
   ```
   커밋되지 않은 변경이 없으면 `git diff --name-only main..HEAD`로 브랜치 전체를 대상으로 한다.

2. 각 파일을 읽고 아래 체크리스트를 기준으로 위반 사항을 찾는다.

### 체크리스트

**TypeScript**
- [ ] `interface` 대신 `type` 사용
- [ ] props에 `Readonly<>` 래퍼 없음
- [ ] React 타입은 named import (`import type { ReactNode } from "react"`)
- [ ] 배열 렌더링 key는 안정적인 `id` 사용 (index, label 금지)

**"use client" 규칙**
- [ ] hook 파일(`use*`)에 `"use client"` 없음
- [ ] 컴포넌트 파일에 `"use client"` 직접 선언 (부모 의존 금지)

**className**
- [ ] 조건부/다중 className은 `clsx` 사용 (템플릿 리터럴 금지)

**JSX**
- [ ] 의미 없는 래퍼 `<div>` 없음 (그룹핑만 필요하면 Fragment 사용)

**SCSS**
- [ ] 컴포넌트 SCSS에서 색상 하드코딩 없음 (반드시 `var(--)` 사용)
- [ ] 컴포넌트 SCSS에서 `@media (prefers-color-scheme: dark)` 색상 분기 없음
- [ ] 중복 스타일 블록은 `%placeholder`로 추출
- [ ] SCSS 변수 파일은 상대 경로 `@use`로 import

**Next.js**
- [ ] navigation은 `next/navigation`에서 import (next/router 금지)
- [ ] dynamic route params는 `await` 처리

3. 결과를 아래 형식으로 출력한다:

```
## 리뷰 결과

### 위반 사항
- `파일경로:줄번호` — 위반 내용 (적용해야 할 규칙)

### 이상 없음
- 검사한 파일 중 위반 없는 파일 목록
```

위반이 없으면 "모든 컨벤션을 준수하고 있습니다."로 마친다.
