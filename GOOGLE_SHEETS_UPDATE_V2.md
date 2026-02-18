# FINAL STEP: Update Google Sheets Headers

Since you have added the comprehensive 10-step questionnaire, the Google Sheet needs to be updated to capture all 40+ new fields.

## Step 1: Update Sheet Headers (Row 1)
Go to your **CuratedCircle Applications** sheet and replace the first row with these headers (Columns A to AJ):

*   **A**: `Timestamp`
*   **B**: `Full Name`
*   **C**: `Age`
*   **D**: `Gender`
*   **E**: `Residence`
*   **F**: `Email`
*   **G**: `Phone`
*   **H**: `License Status`
*   **I**: `Instagram`
*   **J**: `TikTok`
*   **K**: `Portfolio`
*   **L**: `Languages`
*   **M**: `Audience % in UAE`
*   **N**: `Interests`
*   **O**: `Posting Consistency`
*   **P**: `Editing Skills`
*   **Q**: `Equipment`
*   **R**: `Collab Type`
*   **S**: `On-Site Availability`
*   **T**: `Turnaround Time`
*   **U**: `Existing Exclusivity`
*   **V**: `Rate (1 Video)`
*   **W**: `Rate (Bundle)`
*   **X**: `Rate (Whitelisting)`
*   **Y**: `Rate (Raw Footage)`
*   **Z**: `Organic Usage`
*   **AA**: `Paid Usage`
*   **AB**: `Exclusivity Premium`
*   **AC**: `Camera Confidence`
*   **AD**: `Voiceover`
*   **AE**: `Content Style`
*   **AF**: `Pets`
*   **AG**: `Address Type`
*   **AH**: `VAT Registered`
*   **AI**: `Payment Method`
*   **AJ**: `Dietary`
*   **AK**: `Excluded Categories`

## Step 2: Update the Script (CRITICAL)
1.  Open **Extensions** > **Apps Script**.
2.  **Replace** the entire code with this new script that handles all 40 fields:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Helper to format arrays
    var format = (val) => Array.isArray(val) ? val.join(", ") : val;

    sheet.appendRow([
      timestamp,
      data.fullName,
      data.age,
      data.gender,
      data.residence,
      data.email,
      data.phone,
      data.licenseStatus,
      data.instagram,
      data.tiktok,
      data.portfolio,
      format(data.contentLanguages),
      data.audienceLocation,
      format(data.interests),
      data.consistency,
      data.editing,
      data.equipment,
      data.collabType,
      data.availabilityOnSite,
      data.tat,
      data.exclusivity,
      data.rateVideo,
      data.rateBundle,
      data.rateWhitelisting,
      data.rateRaw,
      data.usageOrganic,
      data.usagePaid,
      data.exclusivityPremium,
      data.cameraConfidence,
      data.voiceover,
      format(data.contentStyle),
      data.pets,
      data.addressType,
      data.vatRegistered,
      data.paymentMethod,
      format(data.dietary),
      data.excludedCategories
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3.  Click **Deploy** > **Manage deployments**.
4.  Click the **Pencil icon** (Edit).
5.  Select **New version** from the dropdown.
6.  Click **Deploy**.

**This ensures your form works correctly!**
