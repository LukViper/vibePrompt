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


def call_vibe(text: str, tone: str | None = None, profile: dict | None = None) -> dict:
    payload: dict = {"prompt": text, "text": text}
    if tone:
        payload["tone"] = tone
    if profile:
        payload["user_profile"] = profile
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
            "decision": None,
            "optimized_prompt": None,
            "changes": None,
            "estimated_token_change": None,
            "used_llm": None,
            "error": None,
            "human_clarity": None,
            "human_relevance": None,
            "human_emotional_fidelity": None,
        }
        try:
            data = call_vibe(text, sample.get("tone"), sample.get("profile"))
            row["decision"] = data.get("decision")
            row["normalized_prompt"] = data.get("normalized_prompt")
            row["optimized_prompt"] = data.get("optimized_prompt")
            row["recovery_changes"] = data.get("recovery_changes")
            row["changes"] = data.get("changes")
            row["confidence"] = data.get("confidence")
            row["noise_score"] = data.get("noise_score")
            row["estimated_token_change"] = data.get("estimated_token_change")
            row["used_llm"] = data.get("used_llm")
            print(f"[ok] #{sample['id']} → {data.get('decision')}")
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
