const fs = require('fs');
const path = require('path');
const { drive } = require('../config/googleDriveConfig');

// Upload the file to Google Drive
const uploadToGoogleDrive = async (filePath, mimeType) => {
   const fileMetadata = {
      name: path.basename(filePath),
      mimeType: mimeType,
   };

   const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
   };

   try {
      const response = await drive.files.create({
         resource: fileMetadata,
         media: media,
         fields: 'id, webViewLink',
      });

      return response.data.webViewLink; // Return the public link of the uploaded file
   } catch (err) {
      console.error('Error uploading to Google Drive:', err);
      throw new Error('Failed to upload file to Google Drive');
   }
};

module.exports = { uploadToGoogleDrive };
