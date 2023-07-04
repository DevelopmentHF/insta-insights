import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Insta Insights
        </h1>

        <FileUpload></FileUpload>
      </header>
    </div>
  );
}

export default App;
