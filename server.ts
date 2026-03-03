import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import { google } from "googleapis";
import { Readable } from "stream";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

// Google Sheets and Drive Config
const SPREADSHEET_ID = "1DVJ5hpsJhIrGJ-MWA6uWY76BqiCQeh4niBnj93to0i4";
const GOOGLE_DRIVE_PARENT_FOLDER_ID = process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || ""; // Root if empty

// Google Auth Setup (using Service Account credentials from environment)
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

const sheets = google.sheets({ version: "v4", auth });
const drive = google.drive({ version: "v3", auth });

app.use(express.json());

// API route for application submission
app.post("/api/applications", upload.fields([
  { name: "licenseFile", maxCount: 1 },
  { name: "emiratesIdFile", maxCount: 1 },
  { name: "visaFile", maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const { firstName, lastName, email, phone, age, gender, residence, acceptsGifted, hasLicense, portfolioLink, languages, interestFields, consistency, editingCapabilities, equipment, onSiteAvailability, tat, exclusivity } = formData;

    // 1. Create a folder in Google Drive for this application
    const folderName = `${firstName} ${lastName} - ${new Date().toISOString().split('T')[0]}`;
    const folderResponse = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: GOOGLE_DRIVE_PARENT_FOLDER_ID ? [GOOGLE_DRIVE_PARENT_FOLDER_ID] : [],
      },
    });

    const folderId = folderResponse.data.id;
    const fileLinks: { [key: string]: string } = {};

    // 2. Upload files to the new folder
    const uploadFile = async (file: Express.Multer.File, label: string) => {
      if (!file || !folderId) return "";
      const media = {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      };
      const response = await drive.files.create({
        requestBody: {
          name: `${label} - ${file.originalname}`,
          parents: [folderId],
        },
        media: media,
      });
      return `https://drive.google.com/file/d/${response.data.id}/view`;
    };

    if (files.licenseFile?.[0]) fileLinks.license = await uploadFile(files.licenseFile[0], "License");
    if (files.emiratesIdFile?.[0]) fileLinks.emiratesId = await uploadFile(files.emiratesIdFile[0], "EmiratesID_Passport");
    if (files.visaFile?.[0]) fileLinks.visa = await uploadFile(files.visaFile[0], "Visa");

    // 3. Append data to Google Sheets
    const row = [
      new Date().toISOString(),
      firstName,
      lastName,
      age,
      gender,
      residence,
      email,
      phone,
      acceptsGifted,
      hasLicense,
      portfolioLink,
      languages,
      interestFields,
      consistency,
      editingCapabilities,
      equipment,
      onSiteAvailability,
      tat,
      exclusivity,
      fileLinks.license || "N/A",
      fileLinks.emiratesId || "N/A",
      fileLinks.visa || "N/A",
      `https://drive.google.com/drive/folders/${folderId}`
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:W",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    res.json({ success: true, message: "Application submitted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error processing application:", err);
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom", // Change to custom to handle multiple entry points manually if needed
  });
  app.use(vite.middlewares);
  
  app.get("/admin", async (req, res, next) => {
    try {
      const template = fs.readFileSync(path.resolve(process.cwd(), "admin.html"), "utf-8");
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });

  app.get("*", async (req, res, next) => {
    try {
      const template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });
} else {
  // Static serving for production
  const distPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  app.get("/admin", (req, res) => {
    res.sendFile(path.resolve(distPath, "admin.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
