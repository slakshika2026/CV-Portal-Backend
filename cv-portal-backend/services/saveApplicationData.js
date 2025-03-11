const { google } = require('googleapis');

// Function to save application data to Google Sheets
const saveApplicationData = async ({ name, email, phone, cvLink }) => {
   const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });

   const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Add your Google Sheets ID in .env

   const resource = {
      values: [
         [name, email, phone, cvLink], // Data row
      ],
   };

   try {
      await sheets.spreadsheets.values.append({
         spreadsheetId,
         range: 'Sheet1!A:D', // Adjust based on your sheet structure
         valueInputOption: 'RAW',
         resource: resource,
      });
   } catch (err) {
      console.error('Error saving data to Google Sheets:', err);
      throw new Error('Failed to save data');
   }
};

module.exports = { saveApplicationData };
