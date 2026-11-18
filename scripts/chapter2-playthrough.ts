import { CHAPTER2_SCHEDULE } from "../src/data/chapter2Schedule";
import { runChapterPlaythrough } from "./chapter-playthrough-runner";

await runChapterPlaythrough({
  chapterName: "第 2 章",
  schedule: CHAPTER2_SCHEDULE,
  outputDir: "docs/QA/chapter2-2026-11-18",
  baseUrl: process.env.CHAPTER2_URL ?? "http://127.0.0.1:4328/",
});
