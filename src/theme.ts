export const theme = {
  width: 1080,
  height: 1920,
  fps: 30,

  colors: {
    background: "#0D1B2E",
    panel: "#14273D",
    border: "#284765",
    blue: "#2563EB",
    blueBright: "#40B5FF",
    blueSoft: "#1C4270",
    text: "#F5F8FC",
    muted: "#9FB1C7",
    green: "#22D389",
    greenSoft: "#123E34",
  },

  timing: {
    hook: 2.5,
    question: 6,
    countdown: 4,
    answer: 2.5,
    explanation: 7,
    outro: 3,
  },
} as const;

export const totalSeconds =
  theme.timing.hook +
  theme.timing.question +
  theme.timing.countdown +
  theme.timing.answer +
  theme.timing.explanation +
  theme.timing.outro;
