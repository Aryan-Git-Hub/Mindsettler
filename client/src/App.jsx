import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import AuthPage from "./pages/Authentication";
import PageNotFound from "./pages/404";
import ScrollToTop from "./components/common/ScrollToTop";
import AdminDashboard from "./admin/Dashboard";
import Logout from "./components/auth/Logout";
import { useAuth } from "./context/AuthContext";
import BookingPage from "./pages/BookingPage";
import CorporateServices from "./pages/CorporateServices";
import UserProfile from "./pages/UserProfile";
import ChatWidget from "./components/chatbot/ChatWidget";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";

// A small component to wrap public pages with the Navbar

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <ScrollToTop />
      { user && <ChatWidget user={user} /> }
      <Routes>
        {/* GROUP 1: Public Pages (With Navbar) */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/corporate" element={<CorporateServices/>}/>
        <Route path="/blogs" element={<BlogPage/>}/>
        <Route path="/blog/:id" element={<BlogDetail/>}/>
        {user && user.role==="user" && <Route path="/profile" element={<UserProfile />} />}
        {!user && <Route path="/auth" element={<AuthPage />} />}
        <Route path="/logout" element={<Logout />} />
        {/* GROUP 2: Admin Pages (No Public Navbar) */}
        {/* Your AdminDashboard has its own Sidebar, so it doesn't need a wrapper */}
        {user && user.role==="admin" && <Route path="/admin" element={<AdminDashboard />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
