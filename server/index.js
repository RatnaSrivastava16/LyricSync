// index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const generateRoute = require('./routes/generate');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'media')));

// Routes
app.use('/api/generate', generateRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
