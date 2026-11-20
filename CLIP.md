# How the clip was made (in the agent session)

Source footage: Rockstar's Grand Theft Auto VI Trailer 2, downloaded in
the session with yt-dlp from the official Rockstar Games YouTube upload
(https://www.youtube.com/watch?v=VQRLujxTm3c), 1920x1080, 30 fps,
166.75 s. Fetching the source footage in the session is what the bounty
asks for; no finished clip was downloaded.

## Choosing the moment

I rendered contact sheets of the trailer (one frame every 10 s, then
one frame a second for 18–40 s and 138–160 s) and looked at them.
The stretch 140–156 s is the trailer's highest-energy run: helicopter
over the swamp, Jason and Lucia on a jet ski across the bay with the
Vice City skyline, the motorcycle stunt, night streets, the boat chase.
One continuous getaway. I first tried a centre crop to 9:16, looked at
three frames of the render, and saw the tight motorcycle shot lose its
context in the crop — so I re-rendered with a blur-fill, which keeps the
whole 16:9 frame visible. The second render's three check frames were
good: jet ski + skyline on the hook, the night chase, the convertible.

## Render (ffmpeg, run in the session)

Font: /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf

    ffmpeg -y -i trailer2.mp4 -filter_complex "\
    [0:v]trim=140:156,setpts=PTS-STARTPTS,split[a][b];\
    [a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40[bg];\
    [b]scale=1080:608[fg];\
    [bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1,\
    drawtext=fontfile=$FONT:text='GTA 6 IS OUT NOW':fontsize=84:fontcolor=white:\
    borderw=4:bordercolor=black:x=(w-text_w)/2:y=300:enable='between(t,0,4)'[v1];\
    color=c=black:s=1080x1920:d=10:r=30,setsar=1,\
    drawtext=fontfile=$FONT:text='MAKE CLIPS LIKE THIS':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=620,\
    drawtext=fontfile=$FONT:text='WITH AI — AND EARN':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=720,\
    drawtext=fontfile=$FONT:text='MONEY ON MAKE.FUN':fontsize=72:fontcolor=0xFFD60A:x=(w-text_w)/2:y=820,\
    drawtext=fontfile=$FONT:text='make.fun/bounty/gta6-clipper-01':fontsize=46:fontcolor=white:x=(w-text_w)/2:y=1010[v2];\
    [v1][v2]concat=n=2:v=1:a=0[vout];\
    [0:a]atrim=140:166,asetpts=PTS-STARTPTS[aout]" \
    -map "[vout]" -map "[aout]" -c:v libx264 -crf 23 -preset medium \
    -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart clip.mp4

Result: clip.mp4, 1080x1920, 26.0 s, 6.9 MB. Three frames checked
(t=0.5 s hook, t=4 s chase, t=10 s pitch card) before upload.

## Upload

The rendered file was pushed to the public repo
https://github.com/muskabc/gta6-clipper-01-media (clip.mp4) and posted
to YouTube as a public Short from @mlove-p5p through Postpone
(platform youtube, social_account_id 70140), with the title and
description below. The user authorised posting directly, no preview.

Title: GTA 6 Jet Ski Chase — Jason & Lucia Outrun Everything

Description:
  Jason and Lucia outrun everything on a jet ski through Vice City.
  GTA 6 is out now.
  Made by my AI agent for a $500 bounty on make.fun, where you can earn
  money making clips with AI: https://make.fun/bounty/gta6-clipper-01
  makefun-scallop-jacket-lodge
  #GTA6 #Shorts
