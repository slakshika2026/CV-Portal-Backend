const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const credentials = require('./config/credentials.json'); // Adjust path if needed

const oauth2Client = new google.auth.OAuth2(
   credentials.installed.client_id,
   credentials.installed.client_secret,
   credentials.installed.redirect_uris[0]
);

const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'];

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

// Generate Auth URL
const authUrl = oauth2Client.generateAuthUrl({
   access_type: 'offline',
   scope: SCOPES,
});

console.log('Authorize this app by visiting this URL:', authUrl);

rl.question('Enter the code from that page here: ', async (code) => {
   try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);

      // Save refresh token to a file
      fs.writeFileSync('./config/token.json', JSON.stringify(tokens, null, 2));
      console.log('Token saved to config/token.json');
   } catch (error) {
      console.error('Error retrieving access token', error);
   }
   rl.close();
});
