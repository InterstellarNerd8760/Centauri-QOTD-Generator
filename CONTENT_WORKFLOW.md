# Content Workflow

The question pool is the content engine. The video format is the reusable production system.

## Selection

Do not assume questions must be published in source-file order.

The queue can support randomized or scheduled selection. The recommended starting strategy is a rotating exam class:

- Day 1: Technician
- Day 2: General
- Day 3: Amateur Extra
- repeat

Within each exam class, select questions using a controlled randomization method rather than simply taking T1A01, T1A02, T1A03 in order.

This keeps the feed varied while preserving a deterministic record of what has already been used.

## Important status distinction

A rendered video is not a published post. Keep prototype or rendered status until the user explicitly confirms publication. As of 2026-10-08, T1A01 is published on Instagram Reels and YouTube Shorts. Its Instagram audio was a royalty-free lo-fi track selected in-app; its YouTube Shorts audio was “Memory Reboot” selected in-app. T1B02, T5D01, and G4A05 remain prototypes only.

## States

- unpublished
- prototype
- review
- rendered
- published
- hold

## Daily process

1. Select the next eligible question.
2. Review its question, choices, answer, and explanation.
3. Verify the exam class.
4. Render the video.
5. Watch the complete MP4.
6. Publish.
7. Record publication metadata.
8. Select the next question.

## Selection constraints

Avoid:

- recently used questions
- near-duplicate concepts when possible
- questions with known rendering problems
- questions on hold

A future selector should support:

- exam rotation
- seeded randomness
- recent-history avoidance
- topic balancing
- manual overrides

## Future automation

pool → selector → content QA → renderer → visual QA → caption/package → publish tracking


## Approved first-post production baseline (2026-10-08)

- 9:16, 1080×1920, 30 fps.
- Open immediately on the hook; no black first frame.
- Question and four answer choices centered both horizontally and vertically; header may stay anchored at the top.
- Default question hold: 7 seconds.
- Default countdown: 4 seconds, with a real animated circular ring.
- Answer reveal: 2.5 seconds; only the correct answer gets Centauri green.
- Explanation: at least 6 seconds, and extend if the text needs more time; animate lines subtly so the scene does not freeze.
- Dedicated CTA with the official four-point star logo and the exact lowercase URL `centauriacademy.app`.
- Keep all non-answer text neutral white or blue; avoid making the entire video green.
- Use distinct, intentional slide cuts. Music can be selected natively per platform; do not bake unlicensed trending music into the exported MP4.
- Output quality should preserve sharp phone-readable text; use the configured high-quality H.264 encoding.
- Watch the full exported video before posting, then record publication status/date/platforms in `content/queue.json`.
- This is the baseline, not a permanent ceiling: improve quality through review without breaking readability or brand consistency.
