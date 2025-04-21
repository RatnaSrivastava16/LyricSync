const { exec } = require('child_process');

const generateVideo = ({ audioPath, syncedLyricsPath, genre, outputPath }) => {
  return new Promise((resolve, reject) => {
    const backgroundImage = 'assets/default.jpg'; // You can later vary based on genre

    const ffmpegCmd = `ffmpeg -loop 1 -i ${backgroundImage} -i ${audioPath} -c:v libx264 -tune stillimage -c:a aac -b:a 192k -shortest -y ${outputPath}`;

    exec(ffmpegCmd, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = { generateVideo };
