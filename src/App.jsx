import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseSources from './ChooseSources';
import ViewNews from './ViewNews';
import Menu from './menu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<ChooseSources />} />
            <Route path="/news" element={<ViewNews />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;