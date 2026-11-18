import { CHAPTER3_SCHEDULE } from "../src/data/chapter3Schedule";
import { runChapterPlaythrough } from "./chapter-playthrough-runner";

await runChapterPlaythrough({
  chapterName: "第 3 章",
  schedule: CHAPTER3_SCHEDULE,
  outputDir: "docs/QA/chapter3-2026-11-18",
  baseUrl: process.env.CHAPTER3_URL ?? "http://127.0.0.1:4328/",
});
