// controllers/generateController.js
const path = require('path');
const fs = require('fs');
const { generateVideoWithLyrics } = require('../utils/ffmpegUtils');

const handleGenerateRequest = async (req, res) => {
  try {
    const audioFile = req.files['audio'][0];
    const lyricsFile = req.files['lyrics'][0];
    const genre = req.body.genre || 'default';

    const audioPath = audioFile.path;
    const lyricsPath = lyricsFile.path;

    // Read lyrics
    const lyricsContent = fs.readFileSync(lyricsPath, 'utf-8');

    // Generate video
    const outputVideoPath = await generateVideoWithLyrics(audioPath, lyricsContent, genre);

    const videoName = path.basename(outputVideoPath);
    res.json({ videoUrl: `/media/generated/${videoName}` });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Video generation failed.' });
  }
};

module.exports = { handleGenerateRequest };
