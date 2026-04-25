# my-app

**Claude Code + Next.js 16 App Router 개발 환경 테스트 프로젝트**

이 저장소는 [Claude Code](https://claude.ai/code)를 AI 개발 파트너로 활용해 Next.js 16 앱을 처음부터 구축하는 과정을 실험합니다. 컨벤션 정립, 디자인 시스템, 테스트 환경, Storybook 통합 등을 Claude Code와 함께 단계적으로 구성합니다.

---

## 기술 스택

| 영역 | 선택 |
|---|---|
| 프레임워크 | Next.js 16.2.4 (App Router) |
| 언어 | TypeScript 5 |
| 스타일 | SCSS Modules + CSS Custom Properties |
| 테스트 | Vitest 3 + React Testing Library + happy-dom |
| 컴포넌트 문서 | Storybook 10 (nextjs-vite) |
| 유틸리티 | clsx |

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:3000)
npm run dev

# Storybook (http://localhost:6006)
npm run storybook

# 테스트 watch 모드
npm run test

# 테스트 단회 실행
npm run test:run

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```

> **Node.js 요구사항**: Storybook 10은 Node.js 20.19+ 또는 22.12+가 필요합니다.  
> nvm 사용 시: `nvm install 20 && nvm use 20`

---

## 프로젝트 구조

```
src/
  app/                      # App Router (page, layout, route 파일만)
    dashboard/
      _components/          # /dashboard 전용 컴포넌트
      _hooks/               # /dashboard 전용 hook
      _lib/                 # /dashboard 전용 유틸/데이터
      page.tsx
      layout.tsx
  components/               # 프로젝트 전체 공유 UI 컴포넌트
    Button/                 # 디자인 시스템 - Button
  hooks/                    # 프로젝트 전체 공유 hook
  lib/                      # 프로젝트 전체 공유 유틸
  types/                    # 전역 타입 선언
.storybook/                 # Storybook 설정
.claude/commands/           # Claude Code 커스텀 슬래시 커맨드
```

공유 코드는 `@/*` alias로 접근합니다 (`@/components/Button`).  
route 전용 코드는 상대 경로로 import합니다 (`./_components/Sidebar`).

---

## Claude Code 슬래시 커맨드

이 저장소는 `.claude/commands/`에 재사용 가능한 커스텀 커맨드를 정의합니다.  
Claude Code에서 `/` 를 입력하면 자동완성으로 사용할 수 있습니다.

<!-- AUTO:skills -->
| 커맨드 | 설명 |
|---|---|
| `/commit` | 작업 내역을 분석해서 git commit을 생성한다. |
| `/convention-review` | 현재 브랜치에서 변경된 파일을 CLAUDE.md 컨벤션 기준으로 리뷰한다. |
| `/pr` | 현재 브랜치의 변경 내역을 분석해 GitHub PR 설명을 생성하고 PR을 연다. |
| `/scaffold` | 새 Next.js route를 프로젝트 컨벤션에 맞게 스캐폴딩한다. |
| `/test-gen` | 현재 열려있거나 지정한 소스 파일의 테스트 파일을 생성한다. |
| `/update-readme` | README.md를 현재 프로젝트 상태에 맞게 전체 업데이트한다. |
<!-- /AUTO:skills -->

> 내장 커맨드와 이름이 겹치지 않도록 주의합니다. (`/review`는 내장 PR 리뷰 커맨드)

---

## Claude Code 훅

커밋 시 README.md의 자동 관리 섹션을 갱신하는 훅이 등록되어 있습니다.  
훅 설정은 `.claude/settings.json`에서 관리합니다.

<!-- AUTO:hooks -->
| 이벤트 | 대상 툴 | 실행 명령 |
|---|---|---|
| `PostToolUse` | `Bash` | `bash scripts/sync-readme.sh` |
<!-- /AUTO:hooks -->

---

## 코딩 컨벤션 요약

자세한 내용은 [CLAUDE.md](./CLAUDE.md)를 참고합니다.

- **TypeScript**: `type`만 사용 (`interface` 금지), props에 `Readonly<>` 금지
- **className**: 조건부·다중 className은 반드시 `clsx` 사용
- **JSX**: 의미 없는 래퍼 `<div>` 금지, 그룹핑은 Fragment(`<>`)
- **`"use client"`**: hook 파일에는 작성 안 함, 컴포넌트 파일에는 반드시 직접 선언
- **SCSS**: 색상은 CSS Custom Properties(`var(--)`), 레이아웃 상수는 SCSS 변수
- **dark mode**: 색상 분기는 `globals.scss` 한 곳에서만
