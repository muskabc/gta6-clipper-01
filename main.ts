// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the YouTube video itself: a vertical GTA 6 clip cut by my
// AI agent from Rockstar's Grand Theft Auto VI Trailer 2, posted as a
// public Short from the @mlove-p5p channel with make.fun's pitch in the
// clip and the bounty's line plus our play code in its description.
// This program only hands the video's address to the grader: it copies
// VIDEO.json from the repository root to /output/VIDEO.json, where the
// gate reads it. Nothing this program writes is judged; the house reads
// the video from YouTube and builds the dossier the judge sees.
//
// Run it the way the grader does (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A YouTube video address, as YouTube's Share button gives it:
// https://www.youtube.com/shorts/<id>, https://www.youtube.com/watch?v=<id>
// or https://youtu.be/<id> (www. or m. before youtube.com also read).
const VIDEO_URL_RE =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}/;

const src = join(BOT_DIR, 'VIDEO.json');
const dst = join(OUTPUT_DIR, 'VIDEO.json');

let video: unknown;
let raw: string;
try {
  raw = readFileSync(src, 'utf8');
  video = JSON.parse(raw);
} catch (err) {
  console.error(`VIDEO.json could not be read from ${src}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate reads VIDEO.json only up to 16384 bytes.
if (Buffer.byteLength(raw, 'utf8') > 16384) {
  console.error('VIDEO.json is over the 16384-byte limit the gate reads.');
  process.exit(1);
}

if (typeof video !== 'object' || video === null || typeof (video as { url?: unknown }).url !== 'string') {
  console.error('VIDEO.json must be a JSON object with a string "url" field.');
  process.exit(1);
}

const url = (video as { url: string }).url;
if (!VIDEO_URL_RE.test(url)) {
  // Warn, don't fail: before the video goes up VIDEO.json still holds the
  // placeholder address, and the local run should still prove the copy
  // works. The gate refuses a placeholder at submission time instead.
  console.error(`warning: VIDEO.json url is not a YouTube video address yet: ${url}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(src, dst);
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${dst}: ${(err as Error).message}`);
  process.exit(1);
}

// Confirm the copy landed intact: read it back and compare bytes, so a
// silent short write cannot pass the gate with a truncated VIDEO.json.
const copied = readFileSync(dst, 'utf8');
if (copied !== raw) {
  console.error('VIDEO.json copy does not match the source; refusing to claim success.');
  process.exit(1);
}
console.log(`VIDEO.json handed to the grader: ${url}`);
