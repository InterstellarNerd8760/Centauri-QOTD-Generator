import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import type { Qotd } from "./types";

const id = process.argv[2];

if (!id) {
  throw new Error("Usage: npm run qotd -- T1A01");
}

const dataPath = path.resolve("content", "questions.json");
const outputPath = path.resolve("out", `${id}.mp4`);

const data = JSON.parse(fs.readFileSync(dataPath, "utf8")) as {
  questions: Qotd[];
};

const qotd = data.questions.find((question) => question.id === id);

if (!qotd) {
  throw new Error(`Question not found: ${id}`);
}

const serveUrl = await bundle({
  entryPoint: path.resolve("src", "index.ts"),
});

const composition = await selectComposition({
  serveUrl,
  id: "QOTD",
  inputProps: { qotd },
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: outputPath,
  inputProps: { qotd },
});

console.log(`Rendered ${outputPath}`);
