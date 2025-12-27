import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/home.jsx";
import ContactPage from "./pages/Contact.jsx";
import AuthPage from "./pages/Authentication.jsx";
import PageNotFound from "./pages/404";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/common/Navbar";
import AdminDashboard from "./admin/Dashboard";
import Logout from "./components/auth/Logout.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import BookingPage from "./pages/BookingPage.jsx";

// A small component to wrap public pages with the Navbar
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This is where Home, Login, etc. will render */}
  </>
);

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* GROUP 1: Public Pages (With Navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="booking" element={<BookingPage/>}/>
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {!user && <Route path="/auth" element={<AuthPage />} />}
        {user && <Route path="/logout" element={<Logout />} />}
        {/* GROUP 2: Admin Pages (No Public Navbar) */}
        {/* Your AdminDashboard has its own Sidebar, so it doesn't need a wrapper */}
        {user && user.role==="admin" && <Route path="/admin" element={<AdminDashboard />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
