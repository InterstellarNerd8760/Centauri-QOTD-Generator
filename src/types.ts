export type AnswerLetter = "A" | "B" | "C" | "D";

export type ExamType = "technician" | "general" | "extra";

export type Qotd = {
  sequence: number;
  exam: ExamType;
  id: string;
  group: string;
  question: string;
  answers: [string, string, string, string];
  correct: AnswerLetter;
  explanation: string;
  countdownSeconds?: number;
};
