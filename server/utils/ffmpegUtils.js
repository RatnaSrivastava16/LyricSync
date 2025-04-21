// utils/ffmpegUtils.js
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const generateVideoWithLyrics = async (audioPath, lyrics, genre) => {
  return new Promise((resolve, reject) => {
    const backgroundImage = path.join(__dirname, `../assets/backgrounds/${genre}.jpg`);
    const outputName = `video-${uuidv4()}.mp4`;
    const outputPath = path.join(__dirname, `../media/generated/${outputName}`);
    const tempSrtPath = path.join(__dirname, `../media/uploads/${uuidv4()}.srt`);

    // Generate basic subtitle file (fake timings for now)
    const lines = lyrics.split('\n').filter(l => l.trim() !== '');
    const srtContent = lines.map((line, index) => {
      const start = index;
      const end = index + 1;
      return `${index + 1}
00:00:${start < 10 ? '0' + start : start},000 --> 00:00:${end < 10 ? '0' + end : end},000
${line}
`;
    }).join('\n');

    fs.writeFileSync(tempSrtPath, srtContent);

    ffmpeg()
      .input(backgroundImage)
      .loop()
      .input(audioPath)
      .input(tempSrtPath)
      .complexFilter([
        "subtitles='" + tempSrtPath.replace(/\\/g, '\\\\') + "':force_style='FontSize=24,PrimaryColour=&HFFFFFF&'",
      ])
      .outputOptions('-shortest')
      .save(outputPath)
      .on('end', () => {
        console.log('Video generated:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        reject(err);
      });
  });
};

module.exports = { generateVideoWithLyrics };
