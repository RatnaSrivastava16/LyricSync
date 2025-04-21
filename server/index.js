const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'media/generated')));
app.use('/api/generate', generateRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
