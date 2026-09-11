#!/usr/bin/env python3
"""Run sample prompts through the local VibePrompt API and write results.json."""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SAMPLES = ROOT / "sample_prompts.json"
OUT = ROOT / "results.json"
API = "http://localhost:8000/api/vibe"


def estimate_tokens(text: str) -> int:
    words = len((text or "").split())
    return max(1, int(round(words * 1.3))) if text.strip() else 0


def call_vibe(text: str, tone: str | None = None) -> dict:
    payload = {"text": text}
    if tone:
        payload["tone"] = tone
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        API,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    samples = json.loads(SAMPLES.read_text(encoding="utf-8"))
    results = []

    for sample in samples:
        text = sample["text"]
        row = {
            "id": sample["id"],
            "category": sample.get("category"),
            "original": text,
            "original_token_est": estimate_tokens(text),
            "intent": None,
            "emotion": None,
            "optimized_prompt": None,
            "optimized_token_est": None,
            "error": None,
            "human_clarity": None,
            "human_relevance": None,
            "human_emotional_fidelity": None,
        }
        try:
            data = call_vibe(text)
            row["intent"] = data.get("intent")
            row["emotion"] = data.get("emotion")
            row["optimized_prompt"] = data.get("optimized_prompt")
            row["optimized_token_est"] = estimate_tokens(data.get("optimized_prompt") or "")
            print(f"[ok] #{sample['id']}")
        except urllib.error.URLError as exc:
            row["error"] = f"API unreachable: {exc}"
            print(f"[fail] #{sample['id']}: {row['error']}", file=sys.stderr)
        except Exception as exc:  # noqa: BLE001
            row["error"] = str(exc)
            print(f"[fail] #{sample['id']}: {exc}", file=sys.stderr)
        results.append(row)

    OUT.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
