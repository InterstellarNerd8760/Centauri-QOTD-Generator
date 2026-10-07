# Centauri QOTD Production Template

This is the canonical visual and editorial format for Centauri Academy Question of the Day videos.

## Goal

The QOTD should feel like a polished educational product interface, not a generic social-media template.

The viewer journey is:

**Hook → Question → Think → Answer → Explanation → CTA**

The renderer is deterministic. The question data changes; the visual system does not.

## Output

- Aspect ratio: 9:16
- Production canvas: 1080×1920
- Frame rate: 30 fps
- Duration: content-driven, not an arbitrary fixed target
- Audio: optional and external to the visual renderer

A video may become longer or shorter when necessary to explain the question clearly. Readability and comprehension take priority over hitting a fixed runtime.

## Scene 1 — Hook

Use one unified hook, not a separate exam title card.

Technician:
> Can you solve this Technician ham radio exam question?

General:
> Can you solve this General ham radio exam question?

Amateur Extra:
> Can you solve this Amateur Extra ham radio exam question?

The exam class comes directly from question metadata.

The hook should be visually prominent and concise. Animate it with restrained motion.

## Scene 2 — Question

Show the complete question and all four answer choices.

Give the viewer an initial reading period before the countdown begins.

The question is the dominant visual element.

Requirements:

- high contrast
- large readable type
- clear A/B/C/D labels
- consistent card geometry
- adaptive wrapping
- no visual indication of the correct answer

## Scene 3 — Countdown

Keep the question and answers visible.

Use a large circular countdown ring.

The ring must be a real vector animation driven by the Remotion timeline. It must not be a fake GIF or manually timed overlay.

Default countdown: 8 seconds.

The ring and number must remain synchronized:

**8 → 7 → 6 → 5 → 4 → 3 → 2 → 1**

Use the remaining time to drive the ring's circumference/progress.

The countdown should be the visual centerpiece of the thinking phase.

## Scene 4 — Answer

Show:

> THE ANSWER IS [LETTER]

Highlight the correct answer in Centauri green.

- green border
- subtle green glow
- checkmark
- incorrect answers become visually secondary but remain readable

Do not use exaggerated victory graphics.

## Scene 5 — Explanation

Show:

> AND THIS IS WHY

Then display the question's explanation.

The explanation must have enough screen time to be comfortably read. If a question needs more time, the renderer should allow it rather than forcing the explanation into an arbitrary duration.

Do not shrink text to the point of unreadability just to preserve runtime.

## Scene 6 — CTA

Use:

> Study this question and hundreds more like it.

Then:

> https://centauriacademy.app

Do not pitch Centauri Plus in QOTD videos.

## Visual identity

- Background: #0D1B2E
- Panel: #14273D
- Border: #284765
- Primary blue: #2563EB
- Bright blue: #40B5FF
- Correct green: #22D389
- Green panel: #123E34
- Main text: #F5F8FC
- Muted text: #9FB1C7

Design language:

- technical
- aerospace-inspired
- modern
- restrained
- highly readable
- subtle depth and glow
- consistent four-point/star motif

Do not copy another creator's exact branding.

## Motion

Use controlled fades, slides, scale transitions, glow, card elevation, progress animation, ring animation, and checkmark animation.

Avoid random zooms, meme effects, brainrot captions, fake urgency, excessive kinetic typography, or stock/AI imagery added without a content reason.

## Voice-ready architecture

Voice is optional.

The renderer must work silently, while scene boundaries and text content remain structured enough that voiceover can be added later.

Future voice fields may include:

- hook
- explanation
- outro

Voice should not be required for rendering.

## Responsive text

All question, answer, and explanation text must be rendered through layout helpers that account for:

- line length
- font size
- available width
- available height
- safe margins
- long answer choices
- long explanations

No clipping or microscopic text.

## Quality bar

Before a QOTD is published:

- question is correct
- exam class is correct
- all four choices are readable
- correct answer is correct
- countdown is synchronized
- correct choice turns green
- explanation is readable
- CTA is readable
- no clipping
- no accidental branding from another source
- final video is watched end-to-end
