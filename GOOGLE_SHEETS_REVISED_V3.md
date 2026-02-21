# REVISED: Google Sheets Setup (Feb 2026 Update)

Since we have reorganized the questionnaire into a streamlined 6-step flow with document uploads and gifted-collab filtering, you MUST update your Google Sheet and Apps Script.

## Step 1: Update Sheet Headers (Row 1)
Go to your **CuratedCircle Applications** sheet and replace the first row (A to Y) with these headers:

*   **A**: `Timestamp`
*   **B**: `First Name`
*   **C**: `Last Name`
*   **D**: `Age`
*   **E**: `Gender`
*   **F**: `Residence`
*   **G**: `Email`
*   **H**: `Phone`
*   **I**: `Accepts Gifted?`
*   **J**: `License Status`
*   **K**: `Social Platforms`
*   **L**: `Social Links (JSON)`
*   **M**: `Portfolio`
*   **N**: `Languages`
*   **O**: `Interests`
*   **P**: `Consistency`
*   **Q**: `Editing Skills`
*   **R**: `Equipment`
*   **S**: `On-Site Availability`
*   **T**: `Turnaround Time`
*   **U**: `Exclusivity`
*   **V**: `Legal Consent`
*   **W**: `License Copy`
*   **X**: `Emirates ID`
*   **Y**: `Visa Copy`

---

## Step 2: Update the Apps Script (Smart File Saving)
1.  Open **Extensions** > **Apps Script**.
2.  **Replace** all existing code with this logic:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // --- FILE STORAGE LOGIC ---
    var rootFolderId = "YOUR_DRIVE_FOLDER_ID_HERE"; // 🚨 Replace with your Google Drive Folder ID
    var rootFolder = DriveApp.getFolderById(rootFolderId);
    var applicantFolder = rootFolder.createFolder(data.firstName + " " + data.lastName + " - " + Date.now());
    
    // Helper function to save Base64 files
    function saveFile(base64Data, fileName) {
      if (!base64Data || !base64Data.includes(",")) return "None";
      try {
        var base64 = base64Data.split(",")[1];
        var contentType = base64Data.split(",")[0].split(":")[1].split(";")[0];
        var blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, fileName);
        var file = applicantFolder.createFile(blob);
        return file.getUrl();
      } catch (err) { return "Error Saving"; }
    }

    // Save each document
    var licenseLink = saveFile(data.licenseBase64, "Media_License");
    var emiratesIdLink = saveFile(data.emiratesIdBase64, "Emirates_ID");
    var visaLink = saveFile(data.visaBase64, "Visa_Copy");

    // Helper to format arrays and objects
    var format = (val) => {
      if (Array.isArray(val)) return val.join(", ");
      if (typeof val === 'object' && val !== null) return JSON.stringify(val);
      return val || "";
    };

    sheet.appendRow([
      timestamp,
      data.firstName,
      data.lastName,
      data.age,
      data.gender,
      data.residence,
      data.email,
      data.phone,
      data.acceptGifted,
      data.licenseStatus,
      format(data.socialPlatforms),
      format(data.socialLinks),
      data.portfolio,
      format(data.contentLanguages),
      format(data.interests),
      data.consistency,
      data.editing,
      data.equipment,
      data.availabilityOnSite,
      data.tat,
      data.exclusivity,
      data.legalConsent ? "Agreed" : "No",
      licenseLink,
      emiratesIdLink,
      visaLink
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 💡 How to get your Folder ID:
1. Open Google Drive and create a folder named "UGC Applications".
2. Open that folder.
3. Look at the URL in your browser. It will look like: `drive.google.com/drive/folders/1abc123...`
4. Copy that long string of characters (`1abc123...`) and paste it into the `rootFolderId` variable in the script above.

## Step 3: Deploy Changes
1.  Click **Deploy** > **Manage deployments**.
2.  Click the **Pencil icon** (Edit) next to your active deployment.
3.  In the "Version" dropdown, select **New version**.
4.  Click **Deploy**.

---

## Step 4: Verification
The website is now configured to send data in this exact order. If you've updated the script and headers, submissions will appear immediately in your sheet.
