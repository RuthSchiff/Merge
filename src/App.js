import React from "react";
import MergePDF from "./MergePDF";
import AudioM from "./MergeA";

function App() {
  return (
    <div className="containers-wrapper">
      <div className="component-box">
        <MergePDF />
      </div>

      <div className="component-box">
        <AudioM />
      </div>
    </div>
  );
}

export default App;
