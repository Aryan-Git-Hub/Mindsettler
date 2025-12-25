import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/404';
import AdminDashboard from './admin/Dashboard';
import ScrollToTop from "./components/common/ScrollToTop";
import AuthPage from "./pages/login.jsx";
import Navbar from "./components/common/Navbar.jsx"; // Assuming path

// A small component to wrap public pages with the Navbar
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This is where Home, Login, etc. will render */}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* GROUP 1: Public Pages (With Navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          {/* Add other public pages like /about or /contact here */}
        </Route>

        {/* GROUP 2: Admin Pages (No Public Navbar) */}
        {/* Your AdminDashboard has its own Sidebar, so it doesn't need a wrapper */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;