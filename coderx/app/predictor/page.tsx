"use client";

import React, { useState } from "react";

interface PDFData {
  text: string;
}

function App() {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState<PDFData | null>(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8080/upload_pdf", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPdfData(data);
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>

      {pdfData && (
        <div>
          <h2>Extracted PDF Text:</h2>
          <pre>{pdfData?.text || 'No text extracted'}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
