const express = require('express');
const multer = require('multer');
const { handleApplication } = require('../controllers/applicationController');

// Set up file upload using multer
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Store files in the 'uploads' folder
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`); // Unique file name
   },
});

const upload = multer({ storage: storage });

// Define the API route for job applications
const router = express.Router();

router.post('/', upload.single('cv'), handleApplication); // Handle POST requests

module.exports = router;
