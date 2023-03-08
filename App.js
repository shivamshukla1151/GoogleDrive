const express = require("express");
const { google } = require("googleapis");
const app = express();
const path = require("path");
const fs = require("fs");
const { response } = require("express");

const CLIENT_ID =
  "903880720512-rf5v0ulc5m348rsorq2hgkirthldrgap.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04-8B_GIqXfzWCgYIARAAGAQSNwF-L9IrIrosFAamu656FJHrYIjF2D1-DOT65cWuoc0GoSTBAwYuMRPUVXfVRzfuoLZuDaaOhSs";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const filePath = path.join(__dirname, "wallet-blue.png");

const uploadFile = async () => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "uploaded content",
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// uploadFile();

//delete file

const deleteF = async () => {
  try {
    const response = await drive.files.delete({
      fileId: "1hhOzp0A0Zmp1hpJ8hn48wFIgY_YnZRU1",
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error);
  }
};

// deleteF();
let port = 7800;

app.get("/", (req, res) => {
  res.send("<h1>Hello from Nodemon!!!!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
