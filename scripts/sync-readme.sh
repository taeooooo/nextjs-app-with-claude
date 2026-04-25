#!/usr/bin/env bash
# Claude Code PostToolUse 훅에서 호출된다.
# git commit Bash 호출 이후에만 실행되며, README.md의 자동 관리 섹션을 갱신한다.

set -euo pipefail

# ── 1. git commit 호출인지 확인 ──────────────────────────────────────────────
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c \
  "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command',''))" \
  2>/dev/null || true)

if ! echo "$COMMAND" | grep -q "git commit"; then
  exit 0
fi

cd "$(git rev-parse --show-toplevel)"

# ── 2. 스킬 목록 생성 ────────────────────────────────────────────────────────
SKILLS_TABLE="| 커맨드 | 설명 |\n|---|---|\n"
for f in .claude/commands/*.md; do
  [ -f "$f" ] || continue
  name=$(basename "$f" .md)
  desc=$(head -1 "$f" | sed 's/^#* *//')
  SKILLS_TABLE+="| \`/$name\` | $desc |\n"
done

# ── 3. 훅 목록 생성 ──────────────────────────────────────────────────────────
if [ -f ".claude/settings.json" ]; then
  HOOKS_TABLE=$(python3 - <<'PYEOF'
import json, sys

with open(".claude/settings.json") as f:
    cfg = json.load(f)

hooks = cfg.get("hooks", {})
rows = []
for event, entries in hooks.items():
    for entry in entries:
        matcher = entry.get("matcher", "*")
        for h in entry.get("hooks", []):
            cmd = h.get("command", "")[:60]
            rows.append(f"| `{event}` | `{matcher}` | `{cmd}` |")

if rows:
    print("| 이벤트 | 대상 툴 | 실행 명령 |")
    print("|---|---|---|")
    for r in rows:
        print(r)
else:
    print("_등록된 훅 없음_")
PYEOF
  )
else
  HOOKS_TABLE="_등록된 훅 없음_"
fi

# ── 4. README.md 섹션 교체 ───────────────────────────────────────────────────
README="README.md"

replace_section() {
  local marker="$1"
  local content="$2"
  python3 - "$marker" "$README" <<PYEOF
import sys, re

marker = sys.argv[1]
path   = sys.argv[2]
content = """$content"""

with open(path) as f:
    text = f.read()

pattern = rf'(<!-- AUTO:{marker} -->).*?(<!-- /AUTO:{marker} -->)'
replacement = f'<!-- AUTO:{marker} -->\n{content}\n<!-- /AUTO:{marker} -->'
new_text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open(path, "w") as f:
    f.write(new_text)
PYEOF
}

replace_section "skills" "$(printf '%b' "$SKILLS_TABLE")"
replace_section "hooks"  "$HOOKS_TABLE"

# ── 5. 변경됐으면 스테이징 ──────────────────────────────────────────────────
if ! git diff --quiet README.md; then
  git add README.md
  echo "[sync-readme] README.md 갱신 및 스테이징 완료"
fi
