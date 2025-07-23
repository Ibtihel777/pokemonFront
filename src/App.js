import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import OwnerPage from './pages/OwnerPage';
import ReviewPage from './pages/ReviewPage';
import ReviewerPage from './pages/ReviewerPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/owners" element={<OwnerPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/reviewers" element={<ReviewerPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;