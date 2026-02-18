# Update: Google Sheets Setup for Extended Form

You have added a comprehensive set of questions. To save this new data, you need to **update your Google Sheet and Script**.

## Step 1: Update Sheet Headers
Go to your "CuratedCircle Applications" sheet and update Row 1 with these headers:
*   **A1**: `Timestamp`
*   **B1**: `Full Name`
*   **C1**: `Age`
*   **D1**: `Gender`
*   **E1**: `Residence`
*   **F1**: `Email`
*   **G1**: `Phone`
*   **H1**: `License Status`
*   **I1**: `Instagram`
*   **J1**: `TikTok`
*   **K1**: `Portfolio`
*   **L1**: `Languages`
*   **M1**: `Interests`
*   **N1**: `Equipment`
*   **O1**: `Collab Type`
*   **P1**: `Rates (Video)`
*   **Q1**: `Usage Rights`
*   **R1**: `License File (Link/Base64)`

## Step 2: Update the Script
1.  Open **Extensions** > **Apps Script**.
2.  **Replace** the existing code with this updated version:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Helper to format arrays (like interests)
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
      format(data.languages),
      format(data.interests),
      data.equipment,
      data.collabType,
      data.rates,
      data.usageRights,
      data.licenseBase64 ? "File Attached" : "No File"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3.  **IMPORTANT**: Click **Deploy** > **Manage deployments**.
4.  Click the **Pencil icon** (Edit) next to your existing deployment.
5.  Open the "Version" dropdown and select **New version**.
6.  Click **Deploy**.

**You do NOT need to change the URL in the website code if you update the existing deployment.**
