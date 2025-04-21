const express = require('express');
const multer = require('multer');
const path = require('path');
const generateController = require('../controllers/generateController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../media/uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'audio' }, { name: 'lyrics' }]), generateController);

module.exports = router;
