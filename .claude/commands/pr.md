현재 브랜치의 변경 내역을 분석해 GitHub PR 설명을 생성하고 PR을 연다.

## 절차

1. 다음 명령을 **병렬**로 실행한다:
   - `git branch --show-current` — 현재 브랜치명 확인
   - `git log --oneline main..HEAD` — 브랜치의 커밋 목록
   - `git diff main...HEAD --stat` — 변경된 파일 요약

2. 변경 내역을 분석해 PR 제목과 본문을 작성한다:
   - **제목**: 70자 이내, `feat: / fix: / refactor:` 등 prefix 포함
   - **본문**: 아래 템플릿 사용

```markdown
## 변경 요약
- (bullet point로 주요 변경 사항 2-4개)

## 테스트
- [ ] `npm run test:run` 통과
- [ ] (변경 내용에 따른 추가 확인 항목)
```

3. 현재 브랜치가 원격에 push되어 있는지 확인한다:
   ```
   git status
   ```
   push되지 않았으면 먼저 `git push -u origin <브랜치명>`을 실행한다.

4. PR을 생성한다:
   ```
   gh pr create --title "<제목>" --body "$(cat <<'EOF'
   <본문>

   🤖 Generated with [Claude Code](https://claude.ai/code)
   EOF
   )"
   ```

5. 생성된 PR URL을 출력한다.
