import { CHAPTER5_SCHEDULE } from "../src/data/chapter5Schedule";
import { runChapterPlaythrough } from "./chapter-playthrough-runner";

await runChapterPlaythrough({
  chapterName: "第 5 章",
  schedule: CHAPTER5_SCHEDULE,
  outputDir: "docs/QA/chapter5-2026-11-18",
  baseUrl: process.env.CHAPTER5_URL ?? "http://127.0.0.1:4328/",
});
