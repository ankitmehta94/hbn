const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const youtubeStream = require("youtube-audio-stream");

module.exports = (req, res, url) => {
  const head = {
    "Accept-Ranges": "bytes",
    "Content-Type": "audio/mp3"
  };
  try {
    const stream = ytdl(url);
    proc = new ffmpeg({ source: stream }).format("mp3").pipe(
      res,
      { end: true }
    );
    console.log(proc);
  } catch (err) {
    consol.error(err);
    res.status(500).send({
      success: false,
      error: error
    })
  }
};
