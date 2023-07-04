import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-3xl font-bold underline">
          siuuuu
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <FileUpload></FileUpload>
      </header>
    </div>
  );
}

export default App;
