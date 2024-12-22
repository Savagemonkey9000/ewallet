import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wallet from "./pages/Wallet";
import AddCard from "./pages/AddCard";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen ">
        <div className="pb-20 md:pt-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Wallet />} />
            <Route path="/addcard" element={<AddCard />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
