import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import type { AnswerLetter, Qotd } from "./types";

const letters: AnswerLetter[] = ["A", "B", "C", "D"];

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = (line + " " + word).trim();

    if (candidate.length > maxChars && line) {
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
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 15,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const QotdVideo: React.FC<{ qotd: Qotd }> = ({ qotd }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countdownSeconds =
    qotd.countdownSeconds ?? theme.timing.countdown;

  const introEnd = theme.timing.intro;
  const countdownEnd = introEnd + countdownSeconds;
  const answerEnd = countdownEnd + theme.timing.answer;
  const explanationEnd = answerEnd + theme.timing.explanation;

  const time = frame / fps;

  const scene =
    time < introEnd
      ? "question"
      : time < countdownEnd
        ? "countdown"
        : time < answerEnd
          ? "answer"
          : time < explanationEnd
            ? "explanation"
            : "outro";

  const elapsed = Math.max(
    0,
    Math.min(countdownSeconds, time - introEnd),
  );

  const countdownLeft = Math.max(
    1,
    Math.ceil(countdownSeconds - elapsed),
  );

  const progress = 1 - elapsed / countdownSeconds;

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "26px 26px 24px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: theme.colors.blue,
          transform: `scaleX(${scene === "countdown" ? progress : 1})`,
          transformOrigin: "left",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 2.1,
            color: theme.colors.blueBright,
          }}
        >
          CENTAURI ACADEMY
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: theme.colors.muted,
          }}
        >
          QUESTION OF THE DAY
        </div>
      </div>

      {scene !== "outro" ? (
        <>
          <div
            style={{
              fontSize: 29,
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: -0.6,
              marginBottom: 24,
            }}
          >
            {wrapText(qotd.question, 34).map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 11 }}>
            {qotd.answers.map((answer, index) => {
              const letter = letters[index];
              const isCorrect = letter === qotd.correct;
              const revealed = scene === "answer";

              return (
                <Card
                  key={letter}
                  style={{
                    minHeight: 76,
                    padding: "14px 15px",
                    display: "flex",
                    alignItems: "center",
                    borderColor:
                      revealed && isCorrect
                        ? theme.colors.green
                        : theme.colors.border,
                    background:
                      revealed && isCorrect
                        ? theme.colors.greenSoft
                        : theme.colors.panel,
                    boxShadow:
                      revealed && isCorrect
                        ? "0 0 18px rgba(34, 211, 137, 0.18)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 13,
                      flexShrink: 0,
                      fontSize: 15,
                      fontWeight: 900,
                      background:
                        revealed && isCorrect
                          ? theme.colors.green
                          : theme.colors.blueSoft,
                      color: theme.colors.text,
                    }}
                  >
                    {letter}
                  </div>

                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.22,
                      fontWeight: 650,
                    }}
                  >
                    {answer.replace(/^[A-D]\.\s*/, "")}
                  </div>
                </Card>
              );
            })}
          </div>

          {scene === "countdown" && (
            <div
              style={{
                position: "absolute",
                left: 26,
                right: 26,
                bottom: 32,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: theme.colors.blueBright,
                  lineHeight: 1,
                }}
              >
                {countdownLeft}
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  letterSpacing: 1.7,
                  color: theme.colors.muted,
                  fontWeight: 800,
                }}
              >
                PICK A, B, C, OR D
              </div>
            </div>
          )}

          {scene === "answer" && (
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 2,
                color: theme.colors.green,
              }}
            >
              ANSWER {qotd.correct}
            </div>
          )}

          {scene === "explanation" && (
            <Card
              style={{
                marginTop: 18,
                padding: 17,
                borderColor: theme.colors.green,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 1.8,
                  color: theme.colors.green,
                  marginBottom: 10,
                }}
              >
                WHY?
              </div>

              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.43,
                }}
              >
                {wrapText(qotd.explanation, 52).map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </Card>
          )}
        </>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 18px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              color: theme.colors.blueBright,
              marginBottom: 18,
            }}
          >
            DID YOU GET IT?
          </div>

          <div
            style={{
              fontSize: 25,
              lineHeight: 1.2,
              fontWeight: 850,
              marginBottom: 16,
            }}
          >
            Practice this and
            <br />
            hundreds more questions free.
          </div>

          <div
            style={{
              fontSize: 17,
              fontWeight: 850,
              color: theme.colors.blueBright,
            }}
          >
            centauriacademy.app
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 26,
          right: 26,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: theme.colors.muted,
          letterSpacing: 1,
        }}
      >
        <span>{qotd.id}</span>
        <span>FREE HAM-RADIO STUDY</span>
      </div>
    </AbsoluteFill>
  );
};
