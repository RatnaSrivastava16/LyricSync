// routes/generate.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleGenerateRequest } = require('../controllers/generateController');

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../media/uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'lyrics', maxCount: 1 }
]), handleGenerateRequest);

module.exports = router;
