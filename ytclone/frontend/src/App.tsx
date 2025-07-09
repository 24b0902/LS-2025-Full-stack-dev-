import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main app routes with layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/trending" element={<div className="p-6">Trending page coming soon...</div>} />
                  <Route path="/music" element={<div className="p-6">Music page coming soon...</div>} />
                  <Route path="/dashboard" element={<div className="p-6">Dashboard page coming soon...</div>} />
                  <Route path="/watch-later" element={<div className="p-6">Watch Later page coming soon...</div>} />
                  <Route path="/liked" element={<div className="p-6">Liked Videos page coming soon...</div>} />
                  <Route path="/downloads" element={<div className="p-6">Downloads page coming soon...</div>} />
                  <Route path="/playlists" element={<div className="p-6">Playlists page coming soon...</div>} />
                  <Route path="/upload" element={<div className="p-6">Upload page coming soon...</div>} />
                  <Route path="/search" element={<div className="p-6">Search page coming soon...</div>} />
                  <Route path="/watch/:id" element={<div className="p-6">Video player page coming soon...</div>} />
                  <Route path="/channel/:id" element={<div className="p-6">Channel page coming soon...</div>} />
                  <Route path="*" element={<div className="p-6 text-center">Page not found</div>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
