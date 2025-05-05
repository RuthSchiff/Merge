import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Swal from "sweetalert2";
import "./MergePDF.css";

const MergePDF = () => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
// פונקציה להוספת קבצים לרשימה
  const handleMergePDF = async () => {
    if (pdfFiles.length < 2) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "נא לבחור לפחות שני קבצים PDF למיזוג",
      });
      return;
    }
    // פונקציה לחיבור קבצי PDF
    const pdfDoc = await PDFDocument.create();
    for (let file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const existingPdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await pdfDoc.copyPages(existingPdf, existingPdf.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    const mergedPdfBytes = await pdfDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    // יצירת קישור להורדת הקובץ הממוזג
    setMergedPdfUrl(url);
  };

  return (
    <div className="container">
      <h1 className="title">📝 PDF מיזוג קבצי </h1>
      <input type="file" accept=".pdf" multiple onChange={(e) => setPdfFiles(e.target.files)} className="file-input" />
      <button onClick={handleMergePDF} className="merge-btn">PDF מזג קבצי</button>
      {mergedPdfUrl && (
        <div className="download-section">
          <h3 className="download-title">:המשולב PDF - הורד את ה</h3>
          
        </div>
      )}
         
      <button 
  onClick={() => {
    const link = document.createElement("a");
    link.href = mergedPdfUrl;
    link.download = "merged.pdf";
    link.click();
  }} 
  className="download-btn">
  📄 PDF הורד 
</button>

    </div>
  );
};
export default MergePDF;
