const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const applicationRoutes = require('./routes/applicationRoutes');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/submit', applicationRoutes);

// Serve uploaded files (CVs) from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
