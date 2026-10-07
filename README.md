# Centauri QOTD Generator

Data-driven generator for Centauri Academy's daily Question of the Day videos.

## Fixed format
- 9:16 vertical, 512x910, 30fps
- Centauri navy/blue UI
- Question → 8-second countdown → green answer reveal → explanation → free-practice CTA
- No talking head, B-roll, or TikTok-style editing

## Usage
```bash
npm install
npm run studio
npm run qotd -- T1B02
```
Add future questions as `questions/T1B03.json`, etc. The renderer stays unchanged.
