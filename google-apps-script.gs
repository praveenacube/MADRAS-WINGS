/**
 * Madras Wings Airport Services - Application backend
 * Saves each job application to a Google Sheet (exportable to Excel)
 * and sends an email notification.
 *
 * SETUP (one-time, ~5 minutes):
 * 1. Create a new Google Sheet. Copy its ID from the URL:
 *      https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 * 2. Go to https://script.google.com  ->  New project.
 * 3. Paste this whole file. Set SHEET_ID and NOTIFY_EMAIL below.
 * 4. Deploy  ->  New deployment  ->  type "Web app".
 *      Execute as: Me   |   Who has access: Anyone
 * 5. Copy the /exec URL and paste it into SHEET_WEBHOOK_URL in script.js.
 *
 * To get Excel: in the Google Sheet -> File -> Download -> Microsoft Excel (.xlsx).
 */

const SHEET_ID    = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME  = 'Applications';
const NOTIFY_EMAIL = 'youremail@example.com'; // where notifications are sent

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Submitted At','Full Name','Phone','Email','Location',
        'Qualification','Experience','Job Category','Message'
      ]);
    }

    sheet.appendRow([
      data.submittedAt || new Date(),
      data.fullName || '', data.phone || '', data.email || '',
      data.location || '', data.qualification || '', data.experience || '',
      data.jobCategory || '', data.message || ''
    ]);

    // Email notification
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Airport Job Application - ' + (data.fullName || 'Applicant'),
      body:
        'New application received:\n\n' +
        'Name: '          + (data.fullName || '') + '\n' +
        'Phone: '         + (data.phone || '') + '\n' +
        'Email: '         + (data.email || '') + '\n' +
        'Location: '      + (data.location || '') + '\n' +
        'Qualification: ' + (data.qualification || '') + '\n' +
        'Experience: '    + (data.experience || '') + '\n' +
        'Job Category: '  + (data.jobCategory || '') + '\n' +
        'Message: '       + (data.message || '') + '\n\n' +
        'Submitted: '     + (data.submittedAt || '')
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
