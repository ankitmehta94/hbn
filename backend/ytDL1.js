const ytDL = require('youtube-dl');

module.exports = (url) => {
    ytDL.exec(url, ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
        if (err) throw err;
        console.log(output);
        // output.pipe(fs.createWriteStream('video.flv'));;
      })
}