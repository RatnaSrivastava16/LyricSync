const path = require('path');
const { execSync } = require('child_process');
const { generateVideo } = require('../utils/ffmpegUtils');

const generateController = async (req, res) => {
  try {
    const audioPath = req.files.audio[0].path;
    const lyricsPath = req.files.lyrics[0].path;
    const genre = req.body.genre;

    const syncedLyricsJson = lyricsPath + '.json';

    // Call Python to sync lyrics
    execSync(`python3 ../sync-engine/main.py "${audioPath}" "${lyricsPath}" "${syncedLyricsJson}"`);

    // Generate video
    const outputVideo = `server/media/generated/${Date.now()}_video.mp4`;
    await generateVideo({ audioPath, syncedLyricsPath: syncedLyricsJson, genre, outputPath: outputVideo });

    const videoUrl = `http://localhost:5000/videos/${path.basename(outputVideo)}`;
    res.json({ videoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video generation failed' });
  }
};

module.exports = generateController;
