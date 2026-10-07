# Centauri QOTD Generator

Production content and rendering system for Centauri Academy's daily Question of the Day videos.

## Content pool

The repository contains the full normalized Academy question pool across:

- 409 Technician questions
- 423 General questions
- 603 Amateur Extra questions
- **1,435 total questions**

At one post per day, that is roughly 3.9 years of source content before accounting for selection rules or future additions.

## Repository layout

- `content/questions.json` — normalized question pool
- `content/queue.json` — publishing state
- `VIDEO_SPEC.md` — detailed production specification
- `VIDEO_GUIDELINES.md` — visual/editorial rules
- `CONTENT_WORKFLOW.md` — selection and daily operating procedure
- `TEMPLATE.md` — canonical scene template
- `src/` — Remotion renderer
- `out/` — local renders, ignored by Git

## Rendering

The renderer is designed around structured question data rather than manually edited videos.

The core visual system is built in Remotion so countdowns, transitions, cards, and typography are deterministic.

Voice is optional and can be added later.

The production canvas is 1080×1920 at 30fps.

## Question selection

The content pool does **not** have to be consumed sequentially.

A future selector should rotate Technician → General → Amateur Extra while using controlled randomness within each pool.

## Current development

The renderer is being rebuilt around the production specification. The goal is a polished first production template rather than a pile of one-off edits.

Source files must remain readable and maintainable. Do not minify them.
