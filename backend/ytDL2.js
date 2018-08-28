const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

module.exports = (req, res, id) => {
  const head = {
    "Accept-Ranges": "bytes",
    "Content-Type": "audio/mp3"
  };
  const url = `https://www.youtube.com/watch?v=${id}`
  try {
    cosnole.log(url);
    const stream = ytdl(url);
    proc = new ffmpeg({ source: stream }).format("mp3").pipe(
      res,
      { end: true }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error: error
    })
  }
};
