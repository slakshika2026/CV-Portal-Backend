const fs = require('fs');
const path = require('path');
const { uploadToGoogleDrive } = require('../services/googleDriveService');
const { saveApplicationData } = require('../services/saveApplicationData'); // Function to save data to Google Sheets or DB

// Handle the application submission
const handleApplication = async (req, res) => {
   try {
      const { name, email, phone } = req.body;
      const cvPath = req.file.path; // File path of the uploaded CV

      // Step 1: Upload the CV to Google Drive
      const publicLink = await uploadToGoogleDrive(cvPath, req.file.mimetype);

      // Step 2: Save the application data (e.g., to Google Sheets or a database)
      await saveApplicationData({ name, email, phone, cvLink: publicLink });

      // Clean up uploaded file
      fs.unlinkSync(cvPath);

      res.status(200).json({
         message: 'Application submitted successfully!',
         cvLink: publicLink,
      });
   } catch (error) {
      console.error('Error handling application:', error);
      res.status(500).json({ message: 'Error submitting application' });
   }
};

module.exports = { handleApplication };
