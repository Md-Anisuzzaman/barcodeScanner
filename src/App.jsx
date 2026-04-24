import "./App.css";

// src/App.js
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BarcodeScanner from './components/BarcodeScanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BarcodeScanner />} />
   
      </Routes>
    </Router>
  );
}

export default App;