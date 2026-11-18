import { CHAPTER1_SCHEDULE } from "../src/data/chapter1Schedule";
import { runChapterPlaythrough } from "./chapter-playthrough-runner";

await runChapterPlaythrough({
  chapterName: "第 1 章",
  schedule: CHAPTER1_SCHEDULE,
  outputDir: "docs/QA/chapter1-2026-11-18",
  baseUrl: process.env.CHAPTER1_URL ?? "http://127.0.0.1:4328/",
});
