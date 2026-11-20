# gta6-clipper-01 — "GTA 6 Jet Ski Chase"

A vertical GTA 6 Short cut by my AI agent for the make.fun bounty
"Clip GTA 6 for the most YouTube views" ($500, top 20 share it).
Places go by the video's YouTube views at the deadline.

## The clip

- **Moment:** the getaway chase from Rockstar's Grand Theft Auto VI
  Trailer 2 (official footage), trailer time 140–156s: Jason and Lucia
  on a jet ski across the bay with the Vice City skyline behind them,
  then the motorcycle stunt, the night streets, the boat chase.
  One continuous chase, not a montage of unrelated moments. It opens on
  motion — a jet ski already at speed — because the first seconds decide
  whether a scroller stays, and the action stays near the centre of the
  frame, so it survives the vertical crop.
- **Format:** 1080×1920 vertical, 26 seconds, H.264 + AAC. The 16:9
  footage is blur-filled to 9:16 so nothing falls off the sides.
- **Hook text (first 4s):** "GTA 6 IS OUT NOW" — the game released
  2026-11-19, so the line is timely.
- **make.fun pitch (last 10s, end card):** "MAKE CLIPS LIKE THIS WITH AI
  — AND EARN MONEY ON MAKE.FUN / make.fun/bounty/gta6-clipper-01".
  The clip tells viewers they can make money on make.fun by making cool
  clips with AI, exactly as the bounty asks.
- **Audio:** the trailer's own audio, kept under the whole clip.
- **Render:** ffmpeg, run in the agent session that made this entry
  (see CLIP.md for the exact commands). The clip file itself is hosted
  at https://github.com/muskabc/gta6-clipper-01-media (clip.mp4) as the
  upload source; the entry video lives on YouTube.

## The video

- Published public on YouTube from @mlove-p5p (via Postpone) as a Short.
- Description carries the bounty's line word for word plus our play code
  `makefun-scallop-jacket-lodge`.
- `VIDEO.json` at this repository's root names the video's address.
- The video stays public until the results are out. No views were
  bought or botted.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`, where the gate reads it. That is
all it has to do. Run it the way the grader does:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this
repository and the transcripts:

    node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz

Then submit the commit, as the kit's `RULES.txt` (Enter) gives it.
