import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Ensure it's 'react-router-dom'
import Home from './pages/Home';
import PageNotFound from './pages/404';
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from './components/common/Navbar';
import AuthPage from "./pages/login.jsx"


import AdminDashboard from './admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Admin Routes with Shared Layout */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;