작업 내역을 분석해서 git commit을 생성한다.

## 절차

1. 다음 명령을 **병렬**로 실행한다:
   - `git status` — 스테이징 여부 확인
   - `git diff HEAD` — staged + unstaged 변경 내용 전체 확인
   - `git log --oneline -5` — 이 저장소의 커밋 메시지 스타일 파악

2. 변경 내역을 분석해 커밋 메시지를 작성한다:
   - **형식**: `<type>: <한국어 요약>`
   - **type**: feat / fix / refactor / test / docs / chore / style
   - 첫 줄은 50자 이내로 간결하게
   - 변경의 *이유*가 명확하면 본문에 한 줄 추가
   - 절대로 `.env`, credentials 파일은 포함하지 않는다

3. untracked 파일 중 커밋에 포함해야 할 파일을 staging에 추가한다.
   - `git add -A` 대신 **파일명을 명시**해서 추가한다.

4. 다음 형식으로 커밋한다 (HEREDOC 사용):
   ```
   git commit -m "$(cat <<'EOF'
   <커밋 메시지>

   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   EOF
   )"
   ```

5. `git status`로 커밋 성공을 확인한다.
