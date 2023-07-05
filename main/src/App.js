import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import React, { useState } from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="App bg-gray-800">
      <header className="App-header">
        <Home></Home>

      </header>
    </div>
  );
}

export default App;
// delete pp_twilio.js