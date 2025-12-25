import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import PageNotFound from './pages/404';
import Admin from './pages/Admin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;