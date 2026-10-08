# Centauri QOTD Video Specification v2

## Objective

Build a repeatable short-form educational video system for Centauri Academy.

The output should feel like a real Centauri product interface: technical, polished, readable, and consistent. It should not feel like AI-generated social media filler.

## Viewer journey

Hook → Question → Read → Countdown → Answer → Explanation → CTA

## Hook

Use a single unified sentence based on the exam metadata:

- Technician: "Can you solve this Technician ham radio exam question?"
- General: "Can you solve this General ham radio exam question?"
- Amateur Extra: "Can you solve this Amateur Extra ham radio exam question?"

Do not show the hook and then replace it with a separate exam title card.

## Question

Show the complete question and all four answer choices. Give the viewer a short reading period before the countdown.

The question must remain the dominant visual element. Answer cards must have consistent geometry and clear A/B/C/D labels.

## Countdown

Keep the question and answers visible.

Use a large circular vector countdown ring. It must be driven directly from the Remotion timeline and synchronized with the displayed number.

Default countdown is 8 seconds, but the renderer must support per-question timing.

The countdown should visibly progress from 8 to 1. No fake or pre-rendered timer assets.

## Answer reveal

Show "THE ANSWER IS X".

Highlight the correct answer in Centauri green with a restrained glow and checkmark. Subdue incorrect answers without making them unreadable.

## Explanation

Transition to "AND THIS IS WHY".

Show the supplied explanation. Give enough time to read it comfortably. Runtime is content-driven: never force an explanation to fit a fixed 24-second template.

If a question requires more explanation time, extend the scene.

Do not make text tiny to preserve a target runtime.

## CTA

Use:

"Study this question and hundreds more like it."

"CentauriAcademy.app"

Do not advertise Centauri Plus in the standard QOTD.

## Visual system

Background #0D1B2E
Panel #14273D
Border #284765
Primary blue #2563EB
Bright blue #40B5FF
Correct green #22D389
Green panel #123E34

Reserve green for the correct answer and the countdown indicator/ring. Keep general headings, explanation framing, the logo, and the URL in neutral white or blue. The website URL must always be exactly lowercase: `centauriacademy.app`.
Main text #F5F8FC
Muted text #9FB1C7

Use the official Centauri Academy four-point white star logo from `public/assets/centauri-academy-logo.svg` in the header and CTA. Do not approximate it with a generic icon. Keep the surrounding technical/aerospace visual language restrained.

Do not copy another account's exact branding.

## Motion

Preferred motion:

- controlled fade
- slide
- scale
- subtle glow
- card elevation
- progress animation
- circular countdown animation
- checkmark reveal

Avoid:

- excessive zooms
- random movement
- meme effects
- brainrot captions
- fake urgency
- unnecessary stock or AI imagery
- visual clutter

## Text layout

All dynamic text must use layout helpers that account for available width and height.

The renderer must handle unusually long questions, choices, and explanations without clipping or becoming unreadable.

## Voice

Voice is optional and external to the visual renderer.

The renderer should expose structured scene text so a later voice layer can use:

- hook
- question
- answer
- explanation
- CTA

Do not require voice to render a video.

## Output

- 9:16
- 1080×1920 production resolution
- 30 fps
- runtime determined by content and readability

## QA

Every render must be checked for:

- correct question
- correct exam class
- four readable answers
- correct answer
- synchronized countdown
- correct green reveal
- readable explanation
- correct CTA, with `centauriacademy.app` fully lowercase
- official Centauri Academy logo asset used consistently
- no clipping
- no accidental external branding

The full video should be watched before publishing.
