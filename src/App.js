import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ReviewPage from './pages/ReviewPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;