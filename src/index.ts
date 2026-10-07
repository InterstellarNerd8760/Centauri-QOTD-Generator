import { Composition } from "remotion";
import { QotdVideo, totalSecondsFor } from "./QotdVideo.tsx";
import { theme } from "./theme.ts";
import type { Qotd } from "./types.ts";

const sample: Qotd = {
  sequence: 13,
  exam: "technician",
  id: "T1B02",
  group: "T1B",
  question:
    "Which of the following U.S. amateur radio operators are allowed to contact the International Space Station (ISS) on VHF bands?",
  answers: [
    "Only amateurs with a General class or higher license",
    "Any amateur with a Technician class or higher license",
    "Only amateurs with a General class or higher license, and NASA approval",
    "Any amateurs with a Technician class or higher license, and NASA approval",
  ],
  correct: "B",
  explanation:
    "The ISS operates on VHF frequencies within the privileges of Technician class licensees, so any Technician or higher may contact the ISS. No special NASA approval is required.",
};

export const RemotionRoot = () => (
  <Composition
    id="QOTD"
    component={QotdVideo}
    durationInFrames={Math.ceil(totalSecondsFor(sample) * theme.fps)}
    fps={theme.fps}
    width={theme.width}
    height={theme.height}
    defaultProps={{ qotd: sample }}
  />
);
