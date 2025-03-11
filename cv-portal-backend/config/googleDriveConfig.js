const { google } = require('googleapis');
const credentials = require('../credentials.json'); // Make sure to add your credentials file

// OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
   credentials.client_id,
   credentials.client_secret,
   credentials.redirect_uris[0]
);

// Set the credentials globally
oauth2Client.setCredentials({
   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,  // Add your refresh token to the .env file
});

// Google Drive API instance
const drive = google.drive({ version: 'v3', auth: oauth2Client });

module.exports = { drive };
