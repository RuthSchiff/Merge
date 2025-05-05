import React, { useState } from "react";
import wavEncoder from "wav-encoder";

//רכיב react לחיבור קבצי שמע
const AudioMerger = () => {
  const [files, setFiles] = useState([]);
  const [mergedBuffer, setMergedBuffer] = useState(null);
//פונקציה להוספת קבצים לרשימה
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // הוספת קבצים לרשימה הקיימת
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index)); // מחיקת קובץ מהרשימה
  };
// פונקציה לחיבור קבצי שמע
  const mergeAudioFiles = async () => {
    if (files.length < 2) {
      alert("בחר לפחות שני קבצי שמע לחיבור.");
      return;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffers = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return audioContext.decodeAudioData(arrayBuffer);
      })
    );

    const totalLength = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
    const sampleRate = audioContext.sampleRate;
    const numChannels = audioBuffers[0].numberOfChannels;
    const mergedBuffer = audioContext.createBuffer(numChannels, totalLength, sampleRate);

    let offset = 0;
    audioBuffers.forEach((buffer) => {
      for (let channel = 0; channel < numChannels; channel++) {
        mergedBuffer.getChannelData(channel).set(buffer.getChannelData(channel), offset);
      }
      offset += buffer.length;
    });

    setMergedBuffer(mergedBuffer);
  };
// פונקציה להורדת קובץ השמע המחובר
  const downloadMergedAudio = async () => {
    if (!mergedBuffer) return;

    const audioData = {
      sampleRate: mergedBuffer.sampleRate,
      channelData: Array.from({ length: mergedBuffer.numberOfChannels }, (_, i) => mergedBuffer.getChannelData(i)),
    };

    const wavData = await wavEncoder.encode(audioData);
    const blob = new Blob([wavData], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged_audio.wav";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h2 className="title">🔊 חיבור קבצי שמע</h2>

      {/* העלאת קובץ אחד בכל פעם */}
      <input type="file" accept="audio/*" onChange={handleFileChange} className="file-input" />

      {/* הצגת רשימת הקבצים שנבחרו */}
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button onClick={() => removeFile(index)} className="remove-btn">❌</button>
          </li>
        ))}
      </ul>

      <button onClick={mergeAudioFiles} disabled={files.length < 2} className="merge-btn">
        🔄 חבר קבצים
      </button>

      <button onClick={downloadMergedAudio} disabled={!mergedBuffer} className="download-btn">
        ⬇️ הורד שמע מחובר
      </button>
    </div>
  );
};

export default AudioMerger;
