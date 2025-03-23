// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// // import ReactDOM from 'react-dom/client'; // עדכון כאן

// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);