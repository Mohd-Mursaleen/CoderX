// server.js
const express = require("express");
const { exec } = require("child_process");
// const fs = require("fs").promises;
const path = require("path");
const pdfParse = require("pdf-parse");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const app = express();
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { input } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate C code from pseudocode code given by user : ${input} Only provide the code which has inputs hardcoded and nothing else.`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedCode = response.data.choices[0].message.content.trim();
    res.json({ code: generatedCode });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while generating the code." });
  }
});

function preprocessCode(code) {
  const headers = [
    "#include <stdio.h>",
    "#include <stdlib.h>",
    "#include <string.h>",
    "#include <math.h>",
  ];

  // Check if the code already includes these headers
  const missingHeaders = headers.filter((header) => !code.includes(header));

  // Prepend missing headers to the code
  return missingHeaders.join("\n") + "\n\n" + code;
}

app.post("/api/run", async (req, res) => {
  let { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Preprocess the code
  code = preprocessCode(code);

  try {
    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, "temp");
    await fs.promises.mkdir(tempDir, { recursive: true });

    // Create a temporary file with the preprocessed code
    const tempFile = path.join(tempDir, `code_${Date.now()}.c`);
    await fs.promises.writeFile(tempFile, code);

    // Compile the code
    const compileCommand = `gcc "${tempFile}" -o "${tempFile}.out"`;
    await new Promise((resolve, reject) => {
      exec(compileCommand, (error, stdout, stderr) => {
        if (error) reject({ error, stderr });
        else resolve(stdout);
      });
    });

    // Run the compiled code
    const runCommand = `"${tempFile}.out"`;
    const output = await new Promise((resolve, reject) => {
      exec(runCommand, { timeout: 5000 }, (error, stdout, stderr) => {
        if (error) reject({ error, stderr });
        else resolve(stdout);
      });
    });

    // Clean up temporary files
    await fs.promises.unlink(tempFile);
    await fs.promises.unlink(`${tempFile}.out`);

    res.json({ output });
  } catch (error) {
    console.error("Error running code:", error);
    res
      .status(500)
      .json({ error: "Error running code", details: error.message });
  }
});

// app.post("/upload_pdf", upload.single("file"), (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).send({ error: "No file uploaded" });
//   }

//   // Path to the uploaded PDF
//   const pdfPath = file.path;

//   // Call the Python script with the PDF file path
//   exec(`python3 scripts/extract_pdf.py ${pdfPath}`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing Python script: ${error.message}`);
//       return res.status(500).send({ error: "Error extracting text from PDF" });
//     }

//     if (stderr) {
//       console.error(`Python script error: ${stderr}`);
//       return res.status(500).send({ error: "Error extracting text from PDF" });
//     }

//     // Parse the JSON response from Python script
//     const extractedData = JSON.parse(stdout);

//     // Send extracted text as response
//     res.json(extractedData);

//     // Optional: remove the uploaded file after processing
//     fs.unlinkSync(file.path);
//   });
// });
app.post("/upload_pdf", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: "No file uploaded" });
  }

  // Read the uploaded PDF file
  let dataBuffer = fs.readFileSync(file.path);

  pdfParse(dataBuffer)
    .then(function (data) {
      // Return extracted text as JSON response
      res.json({
        text: data.text,
        numPages: data.numpages,
        numRendered: data.numrender,
        metadata: data.metadata,
      });

      // Optional: remove the uploaded file after processing
      fs.unlinkSync(file.path);
    })
    .catch((err) => {
      res.status(500).send({ error: "Error extracting text from PDF" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
