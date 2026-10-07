import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import type { AnswerLetter, ExamType, Qotd } from "./types";

const letters: AnswerLetter[] = ["A", "B", "C", "D"];

const examLabels: Record<ExamType, string> = {
  technician: "Technician",
  general: "General",
  extra: "Amateur Extra",
};

export function explanationSeconds(qotd: Qotd): number {
  const words = qotd.explanation.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(8, Math.ceil(words / 2.35));
}

export function totalSecondsFor(qotd: Qotd): number {
  return (
    theme.timing.hook +
    theme.timing.question +
    (qotd.countdownSeconds ?? theme.timing.countdown) +
    theme.timing.answer +
    explanationSeconds(qotd) +
    theme.timing.outro
  );
}

function wrapText(text: string, maxCharacters: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;

    if (candidate.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: theme.colors.panel,
        border: `2px solid ${theme.colors.border}`,
        borderRadius: 28,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CentauriMark() {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        transform: "rotate(45deg)",
        borderRadius: 8,
        background: theme.colors.blue,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 24px rgba(37, 99, 235, 0.32)",
      }}
    >
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: theme.colors.text,
        }}
      />
    </div>
  );
}

function Header({ exam }: { exam: ExamType }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 48,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <CentauriMark />
        <div>
          <div
            style={{
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 2.5,
            }}
          >
            CENTAURI
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.8,
              color: theme.colors.muted,
            }}
          >
            ACADEMY
          </div>
        </div>
      </div>

      <div
        style={{
          border: `2px solid ${theme.colors.blueSoft}`,
          borderRadius: 999,
          padding: "12px 18px",
          fontSize: 14,
          fontWeight: 850,
          letterSpacing: 1.4,
          color: theme.colors.blueBright,
        }}
      >
        {examLabels[exam].toUpperCase()}
      </div>
    </div>
  );
}

function AnswerCards({
  qotd,
  revealed,
}: {
  qotd: Qotd;
  revealed: boolean;
}) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {qotd.answers.map((answer, index) => {
        const letter = letters[index];
        const correct = letter === qotd.correct;

        return (
          <Card
            key={letter}
            style={{
              minHeight: 112,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              borderColor:
                revealed && correct
                  ? theme.colors.green
                  : theme.colors.border,
              background:
                revealed && correct
                  ? theme.colors.greenSoft
                  : theme.colors.panel,
              opacity: revealed && !correct ? 0.58 : 1,
              transform:
                revealed && correct ? "translateX(4px)" : "translateX(0)",
              boxShadow:
                revealed && correct
                  ? "0 0 34px rgba(34, 211, 137, 0.18)"
                  : "none",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                marginRight: 20,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  revealed && correct
                    ? theme.colors.green
                    : theme.colors.blueSoft,
                color: theme.colors.text,
                fontSize: 22,
                fontWeight: 950,
              }}
            >
              {letter}
            </div>

            <div
              style={{
                fontSize: 22,
                lineHeight: 1.24,
                fontWeight: 650,
              }}
            >
              {answer}
            </div>

            {revealed && correct && (
              <div
                style={{
                  marginLeft: "auto",
                  paddingLeft: 16,
                  fontSize: 30,
                  color: theme.colors.green,
                  fontWeight: 950,
                }}
              >
                ✓
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function CountdownRing({
  seconds,
  progress,
}: {
  seconds: number;
  progress: number;
}) {
  const size = 230;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.colors.blueSoft}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.colors.blueBright}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 74,
            lineHeight: 1,
            fontWeight: 950,
          }}
        >
          {seconds}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            fontWeight: 850,
            letterSpacing: 2,
            color: theme.colors.muted,
          }}
        >
          THINK
        </div>
      </div>
    </div>
  );
}

export const QotdVideo: React.FC<{ qotd: Qotd }> = ({ qotd }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const countdownSeconds =
    qotd.countdownSeconds ?? theme.timing.countdown;
  const explanationDuration = explanationSeconds(qotd);

  const hookEnd = theme.timing.hook;
  const questionEnd = hookEnd + theme.timing.question;
  const countdownEnd = questionEnd + countdownSeconds;
  const answerEnd = countdownEnd + theme.timing.answer;
  const explanationEnd = answerEnd + explanationDuration;

  const scene =
    t < hookEnd
      ? "hook"
      : t < questionEnd
        ? "question"
        : t < countdownEnd
          ? "countdown"
          : t < answerEnd
            ? "answer"
            : t < explanationEnd
              ? "explanation"
              : "outro";

  const countdownElapsed = Math.max(
    0,
    Math.min(countdownSeconds, t - questionEnd),
  );
  const countdownProgress =
    1 - countdownElapsed / countdownSeconds;
  const countdownLeft = Math.max(
    1,
    Math.ceil(countdownSeconds - countdownElapsed),
  );

  const hookIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.8 },
  });

  const answerIn = interpolate(
    Math.max(0, t - countdownEnd),
    [0, 0.35],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const explanationIn = interpolate(
    Math.max(0, t - answerEnd),
    [0, 0.4],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const outroIn = interpolate(
    Math.max(0, t - explanationEnd),
    [0, 0.45],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );

  const questionLines = wrapText(qotd.question, 52);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "54px 58px 48px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 18%, rgba(37, 99, 235, 0.13), transparent 34%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: theme.colors.blue,
          transform:
            scene === "countdown"
              ? `scaleX(${countdownProgress})`
              : "scaleX(1)",
          transformOrigin: "left",
        }}
      />

      {scene === "hook" && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            padding: "0 100px",
            opacity: hookIn,
            transform: `translateY(${(1 - hookIn) * 35}px)`,
          }}
        >
          <Header exam={qotd.exam} />

          <div
            style={{
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: 2.2,
              color: theme.colors.blueBright,
              marginBottom: 28,
            }}
          >
            QUESTION OF THE DAY
          </div>

          <div
            style={{
              fontSize: 68,
              lineHeight: 1.03,
              fontWeight: 950,
              letterSpacing: -2.5,
            }}
          >
            Can you solve this{" "}
            <span style={{ color: theme.colors.blueBright }}>
              {examLabels[qotd.exam]}
            </span>{" "}
            ham radio exam question?
          </div>

          <div
            style={{
              marginTop: 48,
              width: 170,
              height: 8,
              borderRadius: 99,
              background: theme.colors.blue,
            }}
          />
        </AbsoluteFill>
      )}

      {(scene === "question" ||
        scene === "countdown" ||
        scene === "answer") && (
        <div
          style={{
            opacity: scene === "answer" ? answerIn : 1,
          }}
        >
          <Header exam={qotd.exam} />

          <div
            style={{
              marginBottom: 36,
              fontSize: 43,
              lineHeight: 1.12,
              fontWeight: 900,
              letterSpacing: -1.2,
            }}
          >
            {questionLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>

          <AnswerCards qotd={qotd} revealed={scene === "answer"} />

          {scene === "countdown" && (
            <div
              style={{
                position: "absolute",
                left: 58,
                right: 58,
                bottom: 54,
                padding: "24px 30px",
                borderRadius: 30,
                background: "rgba(13, 27, 46, 0.94)",
                border: `2px solid ${theme.colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 34,
              }}
            >
              <CountdownRing
                seconds={countdownLeft}
                progress={countdownProgress}
              />
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    color: theme.colors.blueBright,
                  }}
                >
                  LOCK IN YOUR ANSWER
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 17,
                    color: theme.colors.muted,
                  }}
                >
                  A · B · C · D
                </div>
              </div>
            </div>
          )}

          {scene === "answer" && (
            <div
              style={{
                marginTop: 28,
                textAlign: "center",
                fontSize: 25,
                fontWeight: 950,
                letterSpacing: 2,
                color: theme.colors.green,
              }}
            >
              THE ANSWER IS {qotd.correct}
            </div>
          )}
        </div>
      )}

      {scene === "explanation" && (
        <AbsoluteFill
          style={{
            padding: "130px 80px 100px",
            opacity: explanationIn,
            transform: `translateY(${(1 - explanationIn) * 28}px)`,
          }}
        >
          <Header exam={qotd.exam} />

          <div
            style={{
              fontSize: 29,
              fontWeight: 950,
              letterSpacing: 3,
              color: theme.colors.green,
              marginBottom: 30,
            }}
          >
            AND THIS IS WHY
          </div>

          <Card
            style={{
              padding: 44,
              borderColor: theme.colors.green,
              boxShadow: "0 0 50px rgba(34, 211, 137, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: 31,
                lineHeight: 1.42,
                fontWeight: 600,
              }}
            >
              {wrapText(qotd.explanation, 56).map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </Card>

          <div
            style={{
              marginTop: 34,
              fontSize: 17,
              color: theme.colors.muted,
              lineHeight: 1.45,
            }}
          >
            Remember the concept, not just the letter.
          </div>
        </AbsoluteFill>
      )}

      {scene === "outro" && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 100px",
            opacity: outroIn,
            transform: `translateY(${(1 - outroIn) * 24}px)`,
          }}
        >
          <CentauriMark />

          <div
            style={{
              marginTop: 38,
              fontSize: 27,
              fontWeight: 900,
              letterSpacing: 2.4,
              color: theme.colors.blueBright,
            }}
          >
            CENTAURI ACADEMY
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 48,
              lineHeight: 1.15,
              fontWeight: 950,
              letterSpacing: -1.2,
            }}
          >
            Study this question
            <br />
            and hundreds more like it.
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 29,
              fontWeight: 900,
              color: theme.colors.blueBright,
            }}
          >
            CentauriAcademy.app
          </div>
        </AbsoluteFill>
      )}

      <div
        style={{
          position: "absolute",
          left: 58,
          right: 58,
          bottom: 20,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: theme.colors.muted,
          letterSpacing: 1.4,
        }}
      >
        <span>{qotd.id}</span>
        <span>FREE HAM-RADIO STUDY</span>
      </div>
    </AbsoluteFill>
  );
};
