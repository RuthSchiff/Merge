import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import './MergePDF.css';
import Swal from "sweetalert2";

const MergePDF = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const handleMerge = async (event) => {
    const files = event.target.files;
    if (files.length < 2) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'נא לבחור לפחות שני קבצים PDF למיזוג',
      });
      return;
    }

    const pdfDoc = await PDFDocument.create();

    for (let file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const existingPdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await pdfDoc.copyPages(existingPdf, existingPdf.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    const mergedPdfBytes = await pdfDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  return (
    <div className="container">
         {/* <h1 className="app-title">🚀 כלי למיזוג PDF</h1> */}
      <h1 className="title">📝 מיזוג קבצי PDF</h1>
      <input 
        type="file" 
        accept="application/pdf" 
        multiple 
        onChange={handleMerge} 
        className="file-input"
      />
      {mergedPdfUrl && (
        <div className="download-section">
          <h3 className="download-title">הורד את ה-PDF המשולב:</h3>
          <a href={mergedPdfUrl} download="merged.pdf" className="download-btn">📄 הורד PDF</a>
        </div>
      )}
    </div>
  );
};

export default MergePDF;
