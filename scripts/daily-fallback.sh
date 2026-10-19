#!/usr/bin/env bash
set -Eeuo pipefail

umask 077
export PATH="${AGENTS_RADAR_PATH:-$HOME/.local/bin:$HOME/.local/share/node-v22.14.0-linux-x64/bin:/usr/local/bin:/usr/bin:/bin}"

repo_dir="${AGENTS_RADAR_REPO_DIR:-$HOME/.local/share/agents-radar}"
repo_slug="${AGENTS_RADAR_REPO:-jinming1345/agents-radar}"
pages_url="${PAGES_URL:-https://jinming1345.github.io/agents-radar}"
state_dir="${XDG_STATE_HOME:-$HOME/.local/state}/agents-radar"
today="$(TZ=Asia/Shanghai date +%Y-%m-%d)"
marker="digests/$today/.feishu-sent"

mkdir -p "$state_dir"
exec 9>"$state_dir/daily.lock"
flock -n 9 || { echo "Another agents-radar run is active; skipping."; exit 0; }

cd "$repo_dir"
git pull --ff-only

if [ -f "$marker" ]; then
  echo "$marker exists; today's Feishu delivery is already complete."
  exit 0
fi

pnpm install --frozen-lockfile --prefer-offline
export GITHUB_TOKEN="${GITHUB_TOKEN:-$(gh auth token)}"
export LLM_PROVIDER="${LLM_PROVIDER:-openai}"
export OPENAI_BASE_URL="${OPENAI_BASE_URL:-https://generativelanguage.googleapis.com/v1beta/openai/}"
export OPENAI_MODEL="${OPENAI_MODEL:-gemini-3.1-flash-lite}"
export LLM_CONCURRENCY="${LLM_CONCURRENCY:-1}"
export LLM_MAX_RETRIES_429="${LLM_MAX_RETRIES_429:-6}"
export DIGEST_REPO="$repo_slug"
export PAGES_URL="$pages_url"
: "${FEISHU_WEBHOOK_URLS:?FEISHU_WEBHOOK_URLS is not set}"

if [ ! -d "digests/$today" ]; then
  : "${OPENAI_API_KEY:?OPENAI_API_KEY is not set}"
  pnpm start
  git add digests/
  git commit -m "digest: $today daily digest"
  git pull --rebase
  git push

else
  echo "digests/$today already exists; retrying notification without regenerating it."
fi

pnpm manifest
git add manifest.json feed.xml
if ! git diff --cached --quiet; then
  git commit -m "chore: update manifest.json"
  git pull --rebase
  git push
fi

pnpm notify:feishu

printf 'sent_at=%s\nsender=systemd-fallback\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$marker"
git add "$marker"
git commit -m "delivery: record Feishu $today"
git pull --rebase
git push
