import "./App.css";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BarcodeScanner from './components/BarcodeScanner';
import Invoice from './components/Invoice';
import Order from './components/Order';
import Products from './components/Products';
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CreateOrder from "./components/CreateOrder";

function App() {
  return (
    <>
     <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<BarcodeScanner />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/order" element={<Order />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-order" element={<CreateOrder />} />
      </Routes>
    </Router>
    </>
   
  );
}

export default App;