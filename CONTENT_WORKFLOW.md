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

A rendered video is not a published post. Keep prototype or rendered status until the user explicitly confirms publication. As of this update, T1B02, T5D01, and G4A05 are prototypes only; no QOTD posts have been published.

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
