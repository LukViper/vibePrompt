#!/usr/bin/env bash
# Build a Chrome Web Store zip from extension/ (clean root layout).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EXT="$ROOT/extension"
DIST="$ROOT/dist"
MANIFEST="$EXT/manifest.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "error: missing $MANIFEST" >&2
  exit 1
fi

VERSION="$(python3 -c "import json; print(json.load(open('$MANIFEST'))['version'])")"
NAME="vibeprompt-${VERSION}"
OUT_ZIP="$DIST/${NAME}.zip"
STAGE="$DIST/.stage-${NAME}"

mkdir -p "$DIST"
rm -rf "$STAGE"
mkdir -p "$STAGE"

# Production files only — no TypeScript stubs, store marketing assets, or docs.
rsync -a \
  --exclude 'types/' \
  --exclude 'store/' \
  --exclude '*.md' \
  --exclude '.DS_Store' \
  --exclude '*.map' \
  "$EXT/" "$STAGE/"

required=(
  manifest.json
  background.js
  options.html
  options.js
  options.css
  privacy.html
  icons/icon16.png
  icons/icon48.png
  icons/icon128.png
  content/content.js
  content/content.css
  content/modal.js
  content/modal.css
  content/sites.js
  content/personalModel.js
)

missing=0
for rel in "${required[@]}"; do
  if [[ ! -e "$STAGE/$rel" ]]; then
    echo "error: missing required file in package: $rel" >&2
    missing=1
  fi
done
if [[ "$missing" -ne 0 ]]; then
  rm -rf "$STAGE"
  exit 1
fi

python3 -c "import json; json.load(open('$STAGE/manifest.json'))"

# Validate icon sizes
python3 << PY
from PIL import Image
from pathlib import Path
stage = Path("$STAGE")
for name, size in [("icon16.png", 16), ("icon48.png", 48), ("icon128.png", 128)]:
    path = stage / "icons" / name
    img = Image.open(path)
    if img.size != (size, size):
        raise SystemExit(f"error: {name} is {img.size}, expected {(size, size)}")
print("icons ok")
PY

rm -f "$OUT_ZIP"
(
  cd "$STAGE"
  zip -r -q "$OUT_ZIP" . -x "*.DS_Store"
)

rm -rf "$STAGE"

echo "Packed $OUT_ZIP"
unzip -l "$OUT_ZIP" | head -n 40
echo "..."
echo "Upload this zip in the Chrome Web Store developer dashboard."
echo "Listing guide: extension/store/STORE_LISTING.md"
