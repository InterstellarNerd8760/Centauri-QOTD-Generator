# Centauri QOTD Generator

Production content + rendering system for Centauri Academy's daily Question of the Day videos.

## The important part

This is **not** a one-question demo repository.

It contains the full Technician question pool, a sequential publishing queue, the canonical video specification, and the renderer.

Current pool size: **409 questions** across **35 groups**.

Group counts:

- T1A: 11
- T1B: 12
- T1C: 11
- T1D: 12
- T1E: 11
- T1F: 11
- T2A: 11
- T2B: 14
- T2C: 12
- T3A: 12
- T3B: 12
- T3C: 11
- T4A: 12
- T4B: 11
- T5A: 11
- T5B: 13
- T5C: 12
- T5D: 14
- T6A: 11
- T6B: 12
- T6C: 12
- T6D: 11
- T7A: 11
- T7B: 11
- T7C: 11
- T7D: 11
- T8A: 12
- T8B: 12
- T8C: 11
- T8D: 12
- T9A: 11
- T9B: 12
- T0A: 12
- T0B: 11
- T0C: 13

## Repository layout

- `content/questions.json` — full normalized question pool
- `content/queue.json` — one-by-one publishing state
- `VIDEO_GUIDELINES.md` — visual/editorial rules
- `CONTENT_WORKFLOW.md` — daily operating procedure
- `TEMPLATE.md` — canonical 24-second format
- `src/` — Remotion renderer
- `out/` — local rendered MP4s (ignored by Git)

## Daily operation

Select the first `unpublished` item in `content/queue.json`, review it, render it, publish it, and mark it published.

Tomorrow's system should require almost no creative engineering. The creative work is choosing/reviewing the content; the format is already solved.

## Commands

```bash
npm install
npm run studio
npm run qotd -- T1A01
```

Do not minify source files. Readability and maintainability matter.
