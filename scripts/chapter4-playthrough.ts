import { CHAPTER4_SCHEDULE } from "../src/data/chapter4Schedule";
import { runChapterPlaythrough } from "./chapter-playthrough-runner";

await runChapterPlaythrough({
  chapterName: "第 4 章",
  schedule: CHAPTER4_SCHEDULE,
  outputDir: "docs/QA/chapter4-2026-11-18",
  baseUrl: process.env.CHAPTER4_URL ?? "http://127.0.0.1:4328/",
});
