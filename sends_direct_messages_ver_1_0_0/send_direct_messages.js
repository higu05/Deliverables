const { google } = require('googleapis');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Constants
const GOOGLE_SHEET_ID = 'your_google_sheet_id';
const GOOGLE_SHEET_RANGE = 'Sheet1!A:C'; // Adjust the range according to your sheet
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');
const SOCIAL_MEDIA_URL = 'https://www.socialmedia.com/login';  // Replace with the actual login URL
const USERNAME = 'your_username';
const PASSWORD = 'your_password';

// Authenticate and access Google Sheets API
async function getGoogleSheetData() {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: GOOGLE_SHEET_RANGE,
  });
  return response.data.values;
}

async function authorize() {
  const { client_secret, client_id, redirect_uris } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const code = await new Promise(resolve => {
      console.log('Enter the code from that page here: ');
      const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Code: ', resolve);
    });
    const token = (await oAuth2Client.getToken(code)).tokens;
    oAuth2Client.setCredentials(token);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  }
  return oAuth2Client;
}

async function updateGoogleSheetStatus(row, status) {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `Sheet1!C${row}`,
    valueInputOption: 'RAW',
    resource: { values: [[status]] },
  });
}

// Puppeteer setup to send messages
async function sendMessage(recipient, message) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(SOCIAL_MEDIA_URL);

  // Login
  await page.type('input[name="username"]', USERNAME);  // Adjust the selector
  await page.type('input[name="password"]', PASSWORD);  // Adjust the selector
  await page.click('button[type="submit"]');  // Adjust the selector
  await page.waitForNavigation();

  // Send message
  try {
    await page.goto(`https://www.socialmedia.com/direct/inbox`);  // Replace with actual direct message URL
    await page.type('input[name="search"]', recipient);  // Adjust the selector
    await page.waitForTimeout(2000);  // Adjust timeout as needed
    await page.click('.user-profile-selector');  // Adjust the selector
    await page.waitForTimeout(2000);  // Adjust timeout as needed
    await page.type('textarea[name="message"]', message);  // Adjust the selector
    await page.click('button[type="submit"]');  // Adjust the selector
    await page.waitForTimeout(2000);  // Adjust timeout as needed
    await browser.close();
    return true;
  } catch (error) {
    console.error(`Failed to send message to ${recipient}: ${error}`);
    await browser.close();
    return false;
  }
}

// Main function
(async () => {
  const rows = await getGoogleSheetData();
  for (let i = 1; i < rows.length; i++) {
    const [recipient, message, status] = rows[i];
    if (status.toLowerCase() !== 'sent') {
      const success = await sendMessage(recipient, message);
      if (success) {
        await updateGoogleSheetStatus(i + 1, 'Sent');
      } else {
        console.error(`Failed to send message to ${recipient}`);
      }
    }
  }
})();
